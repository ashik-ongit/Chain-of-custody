from logic.list import EVIDENCE_STORE

def transfer_logic(data):
    evidence_id = data.evidence_id
    to_role = data.to_role

    evidence = next(
        (e for e in EVIDENCE_STORE if e["id"] == evidence_id),
        None
    )

    if not evidence:
        return {"status": "error", "message": "Evidence not found"}

    # 🔑 THIS LINE MAKES KPI CHANGE
    evidence["current_holder"] = to_role
    evidence["status"] = "transferred"

    return {
        "status": "ok",
        "message": f"Transferred to {to_role}",
    }
