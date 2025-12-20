import hashlib
import time
from logic.list import EVIDENCE_STORE

def add_evidence_logic(data):
    # auto-generate evidence ID
    new_id = f"EV-{str(len(EVIDENCE_STORE) + 1).zfill(4)}"

    new_evidence = {
        "id": new_id,
        "name": data.name,
        "status": "stored",
        "current_holder": "admin",
        "hash": hashlib.sha256(
            f"{new_id}{time.time()}".encode()
        ).hexdigest(),
    }

    # 🔑 STORE IT (THIS WAS MISSING)
    EVIDENCE_STORE.append(new_evidence)

    return {
        "status": "ok",
        "message": "Evidence added",
        "id": new_id,
    }
