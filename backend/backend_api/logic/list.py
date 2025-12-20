# logic/list.py

EVIDENCE_STORE = [
    {
        "id": "EV-0001",
        "name": "Seized Phone",
        "status": "stored",
        "current_holder": "inspector",
        "hash": "HASH_EV_0001",
    },
    {
        "id": "EV-0002",
        "name": "USB Drive",
        "status": "transferred",
        "current_holder": "custodian",
        "hash": "HASH_EV_0002",
    },
    {
        "id": "EV-0003",
        "name": "Confidential Documents",
        "status": "stored",
        "current_holder": "custodian",
        "hash": "HASH_EV_0003",
    },
]

def list_evidence_logic():
    return {"items": EVIDENCE_STORE}
