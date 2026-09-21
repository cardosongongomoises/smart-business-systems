import re
import json

raw_all = ""
try:
    with open("scripts/raw_b1.txt", "r", encoding="utf-8") as f:
        raw_all += f.read() + "\n"
except Exception as e:
    pass

try:
    with open("scripts/raw_b_full.txt", "r", encoding="utf-8") as f:
        raw_all += f.read() + "\n"
except Exception as e:
    pass

blocks = re.split(r"(?=---\s*Lead\s+\d+\s*---)", raw_all)
leads = []

for block in blocks:
    block = block.strip()
    if not block or "Empresa:" not in block:
        continue
    
    id_match = re.search(r"---\s*Lead\s+(\d+)\s*---", block)
    lead_id = int(id_match.group(1)) if id_match else len(leads) + 87

    emp_match = re.search(r"Empresa:\s*(.+)", block)
    empresa = emp_match.group(1).strip() if emp_match else ""

    nome_match = re.search(r"Nome na mensagem:\s*([^|]+)", block)
    nome_na_msg = nome_match.group(1).strip() if nome_match else empresa

    cat_match = re.search(r"Categoria:\s*([^|]+)", block)
    categoria = cat_match.group(1).strip() if cat_match else "Construção Civil"

    cid_match = re.search(r"Cidade:\s*([^\n\r|]+)", block)
    cidade = cid_match.group(1).strip() if cid_match else "Luanda"

    pres_match = re.search(r"Presença digital:\s*(.+)", block)
    presenca = pres_match.group(1).strip() if pres_match else "sem site"

    ang_match = re.search(r"Ângulo:\s*(.+)", block)
    angulo = ang_match.group(1).strip() if ang_match else ""

    emocao_match = re.search(r"Emoção \(Plutchik\):\s*([^|]+)", block)
    emocao = emocao_match.group(1).strip() if emocao_match else ""

    lugar_match = re.search(r"Lugar \(Perelman\):\s*(.+)", block)
    lugar = lugar_match.group(1).strip() if lugar_match else ""

    prem_match = re.search(r"Premissa persuasiva:\s*(.+)", block)
    premissa = prem_match.group(1).strip() if prem_match else ""

    wa_match = re.search(r"WhatsApp:\s*(https://wa\.me/(\d+)\S*)", block)
    whatsapp_url = wa_match.group(1).strip() if wa_match else ""
    telefone = f"+{wa_match.group(2)}" if wa_match else ""

    msg_match = re.search(r"Mensagem:\s*\n([\s\S]+?)(?=\n-{10,}|\n---\s*Lead|$)", block)
    mensagem = msg_match.group(1).strip() if msg_match else ""

    leads.append({
        "id": lead_id,
        "empresa": empresa,
        "nomeNaMensagem": nome_na_msg,
        "categoria": categoria,
        "cidade": cidade,
        "bloco": "Bloco B (Sem site próprio)",
        "presencaDigital": presenca,
        "angulo": angulo,
        "emocao": emocao,
        "lugar": lugar,
        "premissa": premissa,
        "telefone": telefone,
        "whatsappUrl": whatsapp_url,
        "mensagem": mensagem
    })

ts_content = f"""// AUTO-GENERATED: Bloco B Leads
export interface BlocoBLead {{
  id: number;
  empresa: string;
  nomeNaMensagem: string;
  categoria: string;
  cidade: string;
  bloco: "Bloco B (Sem site próprio)";
  presencaDigital?: string;
  angulo: string;
  emocao?: string;
  lugar?: string;
  premissa?: string;
  telefone: string;
  whatsappUrl: string;
  mensagem: string;
}}

export const blocoBLeads: BlocoBLead[] = {json.dumps(leads, indent=2, ensure_ascii=False)};
"""

with open("src/components/operations/data/blocoBLeads.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Parsed {len(leads)} leads for Bloco B. Wrote blocoBLeads.ts successfully.")
