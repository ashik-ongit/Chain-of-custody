from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from logic.insert import add_evidence_logic
from logic.transfer import transfer_logic
from logic.timeline import timeline_logic
from logic.verify import verify_logic
from logic.stats import stats_logic, charts_logic
from logic.list import list_evidence_logic   # NEW IMPORT

app = FastAPI()

# Allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MODELS
class AddEvidenceModel(BaseModel):
    name: str
    description: str

class TransferModel(BaseModel):
    evidence_id: str
    from_role: str
    to_role: str
    notes: str

# ROUTES
@app.post("/evidence/add")
def add_evidence(data: AddEvidenceModel):
    return add_evidence_logic(data)

@app.post("/evidence/transfer")
def transfer_evidence(data: TransferModel):
    return transfer_logic(data)

@app.get("/evidence/timeline/{evidence_id}")
def get_timeline(evidence_id: str):
    return timeline_logic(evidence_id)

@app.get("/evidence/verify/{evidence_id}")
def verify_evidence(evidence_id: str):
    return verify_logic(evidence_id)

@app.get("/dashboard/stats")
def get_stats(role: str):
    return stats_logic(role)

@app.get("/dashboard/charts")
def get_charts():
    return charts_logic()

# NEW: Evidence list endpoint
@app.get("/evidence/list")
def list_evidence():
    return list_evidence_logic()
