import hashlib
import json
from logic.timeline import timeline_logic


def _hash(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()

def verify_logic(evidence_id):
    timeline_data = timeline_logic(evidence_id)
    timeline = timeline_data["timeline"]

    checked = 0

    for index, event in enumerate(timeline):
        payload = {
            "action": event["action"],
            "by": event["by"],
            "timestamp": event["timestamp"]
        }

        # 🔑 CRITICAL: recompute using the SAME prev_hash used during creation
        recomputed_hash = _hash(
            str(event["prev_hash"]) + json.dumps(payload, sort_keys=True)
        )

        # Validate chaining (except genesis)
        if index > 0:
            if event["prev_hash"] != timeline[index - 1]["event_hash"]:
                return {
                    "evidence_id": evidence_id,
                    "valid": False,
                    "failure_at": index,
                    "reason": "prev_hash mismatch"
                }

        # Validate hash integrity
        if event["event_hash"] != recomputed_hash:
            return {
                "evidence_id": evidence_id,
                "valid": False,
                "failure_at": index,
                "reason": "event_hash mismatch"
            }

        checked += 1

    return {
        "evidence_id": evidence_id,
        "valid": True,
        "checked_events": checked
    }
