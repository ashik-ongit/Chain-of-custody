import hashlib
import json

from logic.list import list_evidence_logic


def _hash(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()


def timeline_logic(evidence_id):
    # ---- FIXED DEMO TIMESTAMPS ----
    ADDED_TS = 1766150000.0
    TRANSFER_TS = 1766150100.0

    evidence = next(
    e for e in list_evidence_logic()["items"]
    if e["id"] == evidence_id
)

    genesis_hash = evidence["hash"]

    timeline = []

    # -------- EVENT 1 : ADDED --------
    event1_payload = {
        "action": "added",
        "by": "admin",
        "timestamp": ADDED_TS
    }

    event1_prev_hash = genesis_hash
    event1_hash = _hash(
        event1_prev_hash + json.dumps(event1_payload, sort_keys=True)
    )

    timeline.append({
        "action": "added",
        "by": "admin",
        "timestamp": ADDED_TS,
        "prev_hash": event1_prev_hash,
        "event_hash": event1_hash
    })

    # -------- EVENT 2 : TRANSFERRED --------
    event2_payload = {
        "action": "transferred",
        "by": "inspector",
        "timestamp": TRANSFER_TS
    }

    event2_prev_hash = event1_hash
    event2_hash = _hash(
        event2_prev_hash + json.dumps(event2_payload, sort_keys=True)
    )

    timeline.append({
        "action": "transferred",
        "by": "inspector",
        "timestamp": TRANSFER_TS,
        "prev_hash": event2_prev_hash,
        "event_hash": event2_hash
    })

    return {
        "evidence_id": evidence_id,
        "timeline": timeline
    }
