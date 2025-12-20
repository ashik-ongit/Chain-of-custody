from logic.list import EVIDENCE_STORE

def stats_logic(role: str):
    return {
        "total_evidence": len(EVIDENCE_STORE),
        "in_custody": sum(
            1 for e in EVIDENCE_STORE
            if e["current_holder"] in ("inspector", "custodian")
        ),
        "transfers_today": max(len(EVIDENCE_STORE) - 1, 0),
        "integrity_errors": 0
    }


def charts_logic():
    total = len(EVIDENCE_STORE)

    labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]
    data = [min(i + 1, total) for i in range(len(labels))]

    return {
        # 🔵 LIVE Evidence Added
        "evidence_added": {
            "labels": labels,
            "data": data
        },

        # 🟢 DEMO (leave static)
        "transfers_over_time": {
            "labels": ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            "data": [1, 2, 4, 3, 5, 4, 6]
        },

        # ⚫ DEMO (leave static)
        "verification_results": {
            "labels": ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            "data": [1, 2, 2, 3, 3, 4, 5]
        }
    }
