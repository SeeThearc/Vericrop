# Feature Specification: AgriTrace Pro

**Feature Branch**: `002-title-agritrace-pro`  
**Created**: 2025-09-09  
**Status**: Draft  
**Input**: User description: "AgriTrace Pro: A blockchain-based supply chain system that brings transparency to agricultural commerce through advanced ML, IoT integration, and robust cybersecurity. Phase 1: Core Infrastructure (Weeks 1-3). Include tech stack: Polygon, Solidity, Chainlink, IPFS/Arweave, Node.js/Express/FastAPI, Postgres+Prisma, Redis, Socket.io, Docker/K8s, React+Redux, Material-UI, TF/Py, OpenCV/YOLO. Features: damage detection, quality assessment, yield prediction, ZK proofs, homomorphic encryption, dynamic smart contracts, weather-triggered insurance, carbon credits, multisig, IoT security, AES-256, SSI identity, cold-chain monitoring, QR traceability, price transparency, gamification, APIs: OpenWeatherMap, NASA, USDA, Mapbox, Alpha Vantage, Chainlink, IPFS/Arweave. Backend change: FastAPI, REST, Postgres+Prisma." 

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
A single unified dashboard allows verified stakeholders (Farmers, Distributors, Retailers) to register produce, record quality attestations, update custody and location, and verify transaction history and payments through immutable attestations; consumers may scan QR codes to view provenance. The platform must enable transparent price breakdowns and detection/alerts for exploitation or suspicious activity.

(Stakeholder roles share the same dashboard surface with role-specific views and permissions.)

### Acceptance Scenarios
1. Given an authenticated Farmer, when they register a new batch and attach quality photos, then the system creates an on-chain attestation/hash, issues a QR for the batch, and the batch appears in their active products list.

2. Given a Distributor scanning a product QR, when they verify authenticity, then the system shows the chain of custody, quality certificates, and the recorded farmer information.

3. Given a Retailer submitting a sale transaction, when the sale is recorded, then the smart-contract-attested transaction is available for all authorized stakeholders to verify and an automated price transparency breakdown is shown.

4. Given conflicting updates from two handlers offline, when the device syncs, then the system resolves the conflict using the defined last-valid attestation policy and surfaces a dispute if needed.

### Edge Cases
- Offline first: devices might create local records that sync later; ensure deduplication and conflict resolution.
- Lost or damaged QR labels: support re-issue flow with farmer confirmation and audit trail.
- Malicious QR: if QR hash doesn't match on-chain hash, show 'Invalid / Tampered' and ban automatic acceptance.
- Large batches and partial transfers: support partial custody updates and per-item or per-lot granularity.
- Privacy constraints: some farmer data may be selectively hidden from consumers; ensure selective disclosure.

---

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST allow registered stakeholders (Farmer, Distributor, Retailer) to create and manage an account with role-based permissions. [NEEDS CLARIFICATION: auth method and identity verification process]

- **FR-002**: System MUST allow Farmers to register a new product or batch with structured attributes (crop type, batch id, weight, harvest date) and attach media (photos, sensor logs).

- **FR-003**: System MUST generate a QR code per batch (or per unit where required) that links to an on-chain attestation or immutable metadata hash.

- **FR-004**: System MUST allow Stakeholders to scan/lookup a QR and view the full supply-chain record (provenance, quality reports, handlers, timestamps) and verify the on-chain hash.

- **FR-005**: System MUST allow authorized Stakeholders to record custody transfers and transaction metadata (transfer time, price, handler id) and persist an auditable record.

- **FR-006**: System MUST display a transparent price breakdown for a product showing farmer base price, each handler's markup, and final consumer price.

- **FR-007**: System MUST provide an alerting system for exploitation signals (e.g., sudden price drops, anomalous markups, repeated underpayment patterns).

- **FR-008**: System MUST allow attaching ML-generated quality/damage assessments to product records and surface these to authorized viewers.

- **FR-009**: System MUST support offline recording on mobile devices and reliable sync with conflict resolution policy.

- **FR-010**: System MUST provide an audit log and dispute initiation flow for contested transactions.

- **FR-011**: System MUST permit selective disclosure of sensitive fields to consumers while providing full detail to authorized auditors. [NEEDS CLARIFICATION: exact fields and disclosure policies]

- **FR-012**: System SHOULD integrate automated smart-contract flows for actions like insurance payouts and price-adjusted settlements. [NEEDS CLARIFICATION: payout triggers and escrow rules]

- **FR-013**: System SHOULD provide APIs for third-party integrations (market data, weather, mapping) with scoped rate limits and auth. [NEEDS CLARIFICATION: API surface and SLAs]

- **FR-014**: System MUST log security events (login attempts, key rotations, attestation failures) for compliance and forensics.

*Marked items require follow-up decisions before development.*

### Key Entities *(include if feature involves data)*
- **Stakeholder**: (role: Farmer | Distributor | Retailer | Admin) — id, verified_identity_ref, public_profile (selectively disclosed fields), reputation_score.
- **ProductBatch**: batch_id, crop_type, harvest_date, weight, metadata_hash, QR_code_ref, owner_history (list of custody records).
- **CustodyRecord**: timestamp, from_handler, to_handler, location, handler_signature_ref, transaction_ref.
- **QualityReport**: reporter_id, timestamp, images_refs, ml_quality_score, notes, sensor_payload_refs.
- **Transaction**: tx_id, parties, amount, currency, timestamp, onchain_attestation_ref.
- **AuditLog**: event_id, actor, action, timestamp, details.

---

## Review & Acceptance Checklist

### Content Quality
- [x] No implementation details critical to acceptance (major tech choices move to non-normative notes)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

*Open clarifications*:
- Auth & identity verification approach (FR-001)
- Exact selective disclosure policy and retention periods (FR-011)
- Smart-contract triggers for automated payouts (FR-012)
- API SLAs and third-party integration scopes (FR-013)

---

## Execution Status

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [ ] Requirements generated (drafted)
- [ ] Entities identified (drafted)
- [ ] Review checklist passed

---

## Appendix: Frontend user flow (unified dashboard)

Include the requested flowchart (Mermaid) for the frontend user flow. This diagram describes landing, role selection, unified dashboard behavior, and consumer portal interactions.

flowchart TD
    A[Landing Page] --> B{User Type?}
    B -->|Farmer| C[Farmer Login/Register]
    C --> D[Farmer Dashboard]
    D --> E[Register New Produce]
    D --> F[Track My Products]
    D --> G[Transaction History]
    D --> H[Pricing Dashboard]
    E --> E1[Enter Product Details]
    E1 --> E2[Upload Quality Photos]
    E2 --> E3[Set Base Price]
    E3 --> E4[Create Blockchain Record]
    E4 --> E5[Generate QR Code]
    E5 --> E6[Print/Attach QR to Product]
    F --> F1[View Active Products]
    F1 --> F2[Update Location/Status]
    F2 --> F3[View Current Handlers]
    G --> G1[Payment Records]
    G1 --> G2[Price History]
    G2 --> G3[Verify Fair Payments]
    H --> H1[Market Price Comparison]
    H1 --> H2[Price Transparency Report]
    H2 --> H3[Exploitation Alerts]
    B -->|Distributor/Retailer| I[Stakeholder Login]
    I --> J[Stakeholder Dashboard]
    J --> K[Scan QR Code]
    J --> L[Update Product Status]
    J --> M[Record Transaction]
    J --> N[View Supply Chain]
    K --> K1[Verify Product Authenticity]
    K1 --> K2[Check Quality Certificates]
    K2 --> K3[View Farmer Details]
    L --> L1[Update Location]
    L1 --> L2[Change Handler]
    L2 --> L3[Record on Blockchain]
    M --> M1[Enter Purchase Price]
    M1 --> M2[Record Sale Price]
    M2 --> M3[Calculate Markup]
    M3 --> M4[Smart Contract Execution]
    N --> N1[View Full Chain History]
    N1 --> N2[Verify All Transactions]
    N2 --> N3[Check Price Fairness]
    B -->|Consumer| O[Consumer Portal]
    O --> P[Scan Product QR]
    P --> P1[View Product Origin]
    P1 --> P2[See Farmer Information]
    P2 --> P3[Track Journey Path]
    P3 --> P4[View Price Breakdown]
    P4 --> P5[Quality Verification]
    P5 --> P6[Authenticity Check]
    Q --> Q1[Filter by Location]
    Q1 --> Q2[Filter by Price Range]
    Q2 --> Q3[View Available Products]
    Q3 --> P1

---

## Non-normative: Implementation context (provided by requester)
(This section is informational only — implementation decisions must be validated during planning.)
- Suggested blockchain: Polygon/Ethereum; smart contracts in Solidity; oracles via Chainlink; off-chain metadata in IPFS/Arweave.
- Backend suggestions: FastAPI (REST), Postgres + Prisma, Redis cache, Socket.io for realtime.
- Frontend: React + Redux, Material-UI.
- ML: server-side Python services for CV/ML; TF/OpenCV/YOLO for damage detection.

---

## Next steps / Hand-off
- Confirm decisions for items marked [NEEDS CLARIFICATION].
- Finalize auth & identity verification approach.
- Define data retention policies and selective disclosure fields.
- Draft API contracts for third-party integrations.
- Prepare an initial MVP plan focusing on: QR generation & verification, product registration, custody updates, and basic price transparency.

---

## Frontend routes (recommended)

Design: Single unified dashboard surface at `/dashboard` with role-based view gating. Routes are shallow and human-readable.

- `/` — Landing page (role chooser, marketing, sign-in link)
- `/login` — Authentication entry (choose or detect role; supports deep-linking)
- `/dashboard` — Unified dashboard shell (loads role and permission context)
  - `/dashboard/overview` — Role-specific overview cards (active batches, alerts, quick actions)
  - `/dashboard/products` — List of products/batches the stakeholder owns or manages
  - `/dashboard/products/:batchId` — Batch detail (provenance, quality reports, custody timeline, QR, actions)
  - `/dashboard/scan` — QR scanner page (mobile-first) to verify product and open `/dashboard/products/:batchId`
  - `/dashboard/transactions` — Transaction history and dispute initiation
  - `/dashboard/pricing` — Pricing transparency view (breakdown, markups, market comparison)
  - `/dashboard/alerts` — Exploitation/fraud alerts and mitigation actions
  - `/dashboard/settings` — Profile, identity verification, device/keys management
- `/consumer` — Consumer-facing portal
  - `/consumer/search` — Search/browse products
  - `/consumer/product/:batchId` — Public view with selective disclosure

Auth & Guards:
- Route access controlled by role-based middleware; some components perform additional permission checks on sensitive data.
- `/dashboard` is the single entry; deep links to nested routes require the same role-checks and will redirect to `/login` if unauthenticated.

Client responsibilities:
- Keep on-device offline queue for `/dashboard/products/:batchId` updates when offline and sync on reconnect.
- Verify on-chain hashes when opening a batch detail; show clear 'Verified' or 'Tampered' badges.

API surface expectations (high-level):
- GET `/api/products?ownerId=` — list
- GET `/api/products/:batchId` — detail (includes metadata_hash, custody records)
- POST `/api/products` — create batch (returns QR/ref and onchain attestation handle)
- POST `/api/custody` — record transfer
- POST `/api/verify/hash` — verify metadata hash with onchain attestation


