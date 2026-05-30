# Topics roster — 150 articles across 15 writer buckets

Each writer agent (alice-01 … oscar-15) owns one bucket of 10
unique topics. Buckets are mutually exclusive — no two agents
write the same topic, ever. Within a bucket the agent picks order.

Each agent MUST:

1. Read the primary source (USCIS PM, DOS cable, DHS rule,
   Federal Register notice, EOIR precedent decision, DOL guidance).
   Download the PDF to `public/source-docs/<slug>.pdf` if one
   exists.
2. Author the article at `src/content/articles/<slug>.mdx` using
   the four mandatory sections (`## What changed`, `## Why it
   matters`, `## Way forward`, `## Disclaimer`). `.mdx` lets us
   drop in JSX-style components later without renaming; pure
   markdown bodies render identically.
3. **Backdate `publishDate` to the date the agency itself
   published the source** — NOT to today.
4. Cite real `sourceUrl` (uscis.gov, state.gov, dhs.gov,
   federalregister.gov, justice.gov/eoir, dol.gov). Never
   fabricate a citation. If the source you'd cite doesn't exist,
   pick a different topic and tell the coordinator.
5. Open a PR (`agent/<bucket-id>/batch-1`) when the bucket is
   complete. Do NOT push direct to `main`.

---

## Bucket 01 — alice — Family-based immigration core

1. I-130 petitioner eligibility — citizen vs LPR petitioners and what each can petition for
2. I-130 derivative beneficiary rules under the Child Status Protection Act (CSPA)
3. K-1 fiancé(e) visa — meeting the 2-year in-person rule and the 90-day marriage clock
4. K-3 spouse visa — when it still makes sense vs filing I-130 alone
5. I-485 adjustment of status — eligibility windows for IR-1, IR-2, IR-5 categories
6. I-485 inadmissibility grounds under INA §212(a) — the public-charge ground after the 2024 final rule
7. Marriage-based green card interviews — Stokes interviews, separation, and the bona fides record
8. Conditional permanent residence — I-751 joint petition vs waiver after divorce, abuse, or hardship
9. F2A vs F2B preference — derivative-child aging-out math and CSPA's "sought to acquire" requirement
10. I-130 revocation — the §205 grounds USCIS uses to pull back an approved petition

## Bucket 02 — bravo — Family-based humanitarian + protection edges

1. VAWA self-petition — Form I-360 for battered spouses, parents, children
2. U visa — Form I-918, qualifying criminal activity list, and the 5-year waitlist reality
3. T visa — Form I-914 for victims of severe trafficking, "law enforcement cooperation" requirement
4. SIJS — special immigrant juvenile status, state-court predicate orders, the 21-year cutoff
5. Asylum I-589 affirmative process — one-year filing deadline + extraordinary circumstances exceptions
6. Withholding of removal under INA §241(b)(3) — the higher bar vs asylum
7. Convention Against Torture (CAT) protection — when asylum is barred
8. Refugee resettlement vs asylee status — converting I-730 to LPR
9. Cuban Adjustment Act — one-year-and-a-day requirement after parole
10. NACARA §203 cancellation — narrowing pool of eligible Salvadorans, Guatemalans, former Soviet bloc

## Bucket 03 — charlie — Employment-based green cards (EB-1 / EB-2 / EB-3)

1. EB-1A extraordinary ability — the 10 regulatory criteria + 2-prong final-merits review under Kazarian
2. EB-1B outstanding professor / researcher — the 6 criteria, tenure / tenure-track requirement
3. EB-1C multinational manager / executive — qualifying relationship + 1-year-in-3 abroad rule
4. EB-2 NIW national interest waiver — Matter of Dhanasar three-prong framework
5. EB-2 schedule A occupations — nurses, physical therapists, and the pre-certified labor cert
6. EB-3 skilled worker vs professional vs other-worker — bachelor's / 2-year experience / unskilled splits
7. EB-4 special immigrant — religious workers (R-1 → I-360), broadcasters, NATO civilians
8. EB-5 investor visa — direct vs regional center, $800K targeted-employment-area math after RIA 2022
9. Schedule A pre-certified shortage occupations — current list and how it bypasses PERM
10. Visa retrogression — managing a priority-date wait when your client's I-140 is approved but EB-2 India is years out

## Bucket 04 — delta — PERM + I-140 + employer compliance

1. PERM — Form ETA-9089 process, recruitment timing, prevailing-wage determination
2. PERM audit — surviving an audit letter with the recruitment file, applicant log, SVP/SOC cross-check
3. PERM supervised recruitment — when DOL takes over the process and what you can / can't control
4. PERM denial appeals — BALCA review timing and the 30-day reconsideration window
5. I-140 portability under AC21 §106(c) — switching employers 180 days after I-485 receipt
6. I-140 ability-to-pay — the audited financials threshold and the net-current-assets workaround
7. H-1B visa — cap-subject vs cap-exempt employers, the cap-gap automatic extension for F-1s
8. H-1B Labor Condition Application — wage levels I-IV and the 10-day prevailing-wage filing window
9. H-1B amendments — Matter of Simeio after a worksite change and when an amended LCA isn't enough
10. PERM prevailing-wage determination — OFLC's H-1B Skill Level guidance for level placement

## Bucket 05 — echo — Nonimmigrant work visas (L, O, E, P, R, TN)

1. L-1A intracompany transferee, manager / executive — qualifying relationship + 1-year abroad in 3
2. L-1B specialized knowledge — the Matter of GST and how USCIS reads "specialized" in 2024+
3. L-1 blanket vs individual petitions — the L-1 Visa Reform Act §214(c)(2) blanket framework
4. O-1A extraordinary ability in sciences, education, business, athletics — evidentiary criteria
5. O-1B extraordinary ability in arts / TV / film — distinct criteria and the consultation letter
6. E-1 treaty trader / E-2 treaty investor — qualifying country list and 50%-ownership rule
7. E-3 specialty occupation visa for Australians — quirks vs H-1B and consular processing path
8. P-1 athlete / entertainer visa — internationally recognized standard and team vs individual
9. R-1 religious worker visa — 2-year qualifying religious denomination membership
10. TN visa under USMCA — qualifying professions list and Mexican vs Canadian process

## Bucket 06 — foxtrot — Student + exchange + dependent statuses (F, J, M, B)

1. F-1 student visa — initial issuance, SEVIS I-20, and 30-day arrival window
2. F-1 OPT — 12-month post-completion OPT clock and unemployment days
3. F-1 STEM OPT — 24-month extension eligibility, DSO reporting, E-Verify employer
4. CPT curricular practical training — integral-to-curriculum requirement and the 12-month full-time cap
5. M-1 vocational student visa — vs F-1, and limited part-time work authorization
6. J-1 exchange visitor — categories (research scholar, intern, trainee, summer-work-travel)
7. J-1 two-year home residency requirement under §212(e) — waiver paths
8. H-4 EAD — eligibility (I-140 approved or AC21 extension), Litigation challenge status
9. L-2 dependent EAD — automatic work authorization after the 2021 settlement
10. F-2 / J-2 / M-2 dependent rules — what dependents can and can't do

## Bucket 07 — golf — Naturalization, citizenship, and the N-400

1. N-400 naturalization — eligibility (5-year LPR / 3-year if spouse of citizen) and continuous-residence rule
2. N-400 physical-presence rule — half-of-the-statutory-period requirement
3. N-400 good moral character — INA §101(f) bars and the statutory-period look-back
4. N-400 English + civics test — the 65/20 senior-exception, medical disability N-648
5. Derived citizenship under CCA 2000 — automatic acquisition for children of naturalized parents
6. Acquired citizenship at birth abroad — INA §301 transmission and the physical-presence math
7. N-600 certificate of citizenship — who needs one and why
8. N-565 replacement of naturalization document — when to file vs request a duplicate
9. Renunciation of U.S. citizenship — DS-4080 process and exit tax considerations
10. Dual citizenship — what the State Department actually says vs the popular myth

## Bucket 08 — hotel — Removal defense + EOIR + appeals

1. NTA notice to appear — what must be on the document under Matter of Bermudez-Cota
2. Cancellation of removal for LPRs under INA §240A(a) — 7-year continuous residence + 5-year LPR
3. Cancellation of removal for non-LPRs under §240A(b) — 10-year + good moral character + exceptional hardship
4. §212(c) waiver — vestiges still alive for pre-1996 convictions under St. Cyr
5. Voluntary departure under §240B — pre-conclusion vs post-conclusion, bond, and the 60/120-day limits
6. Bond redetermination — Matter of Adeniji, IJ discretion, and the pre-departure / post-departure split
7. Asylum-only proceedings — VWP overstays and other expedited tracks
8. BIA appeals — the 30-day filing window and what makes a brief reviewable
9. Motions to reopen — number / time bars and the changed-country-conditions exception
10. EOIR mediation / pre-trial conferences — how to use them for stipulations and continuances

## Bucket 09 — india — DOS consular processing + waivers

1. DS-160 nonimmigrant visa application — common rejection reasons and how to fix
2. DS-260 immigrant visa application — the NVC packet and follow-to-join timing
3. Consular interview — what to bring, what they ask, and the 221(g) administrative-processing limbo
4. INA §214(b) refusal — overcoming the presumption of immigrant intent
5. INA §212(a)(4) public charge ground at consular stage — DS-5540 and DOS's reading of "totality"
6. I-601 waiver — extreme-hardship standard under Matter of Cervantes
7. I-601A provisional unlawful-presence waiver — eligibility before the consular interview
8. I-212 permission to reapply after removal — when it's required and the discretionary factors
9. INA §212(d)(3) nonimmigrant waiver — Matter of Hranka factors
10. Visa Bulletin — Final Action Date vs Date for Filing, when DOS updates "use DFF" toggle

## Bucket 10 — juliet — Work authorization, travel documents, AC21

1. I-765 EAD — categories (c)(9), (c)(8), (c)(33), (c)(36) and the most common filing mistakes
2. I-765 (c)(33) DACA work authorization — current litigation status and renewal timing
3. EAD automatic extension under 8 CFR §274a.13 — 540-day rule, scope and limitations
4. I-131 advance parole — when AOS applicants need it, the abandonment risk if you depart without one
5. Re-entry permit (I-131) for LPRs — preserving residence during extended absences
6. Refugee travel document — limits on returning to country of feared persecution
7. AC21 §104(c) 3-year H-1B extension beyond the 6-year cap
8. AC21 §106(a) H-1B 1-year extension on a pending PERM / I-140
9. Reinstatement of F-1 status — the 5-month window and the "no fault" standard
10. Change of status I-539 — when to file, processing-time risk, and the gap-in-status problem

## Bucket 11 — kilo — Inadmissibility, deportability, and crimmigration

1. Crimes involving moral turpitude (CIMT) — Matter of Silva-Trevino II categorical approach
2. Aggravated felonies — the §101(a)(43) laundry list and the "one-year sentence" trigger
3. Controlled-substance offenses — INA §212(a)(2)(A)(i)(II) vs the simple-possession-of-marijuana exception
4. Unlawful presence — 3-year, 10-year, and permanent bars and what triggers them
5. False claim to U.S. citizenship — INA §212(a)(6)(C)(ii) and why it's catastrophic
6. Material misrepresentation under §212(a)(6)(C)(i) — the I-601 waiver path
7. Frivolous asylum filing under §208(d)(6) — the permanent bar and what counts as frivolous
8. Petty offense exception to CIMT inadmissibility — INA §212(a)(2)(A)(ii)(II)
9. Crime of domestic violence — INA §237(a)(2)(E) and the categorical-approach analysis
10. Firearms offense deportability — §237(a)(2)(C) and the unusual "any felony" trigger

## Bucket 12 — lima — Humanitarian programs + parole + TPS

1. Temporary Protected Status (TPS) — designation criteria, registration windows, and the work-authorization piece
2. TPS travel — advance parole and the "stop-time" risks of re-entry
3. Deferred Enforced Departure (DED) — Liberia, Hong Kong, Venezuela history
4. Humanitarian parole under INA §212(d)(5) — Ukraine, Cuba/Haiti/Nicaragua/Venezuela parole programs
5. Parole-in-place for military families — Matter of Quintero-Mejia
6. CHNV parole — the Cuba/Haiti/Nicaragua/Venezuela process and current sponsor requirements
7. Uniting for Ukraine — eligibility and the parole-extension process after 2-year initial term
8. Afghan parolees — Operation Allies Welcome and the AAIA pathway
9. Deferred Action for Childhood Arrivals (DACA) — current litigation status
10. SIV special immigrant visa — Iraqi and Afghan interpreters and the §1059 / §1244 frameworks

## Bucket 13 — mike — USCIS adjudication mechanics + procedure

1. RFE responses — preparing a focused, evidence-only response under 8 CFR §103.2(b)(8)
2. NOID notice of intent to deny — when USCIS issues one vs an RFE
3. NOIR notice of intent to revoke — defending an approved I-140 / I-130 from revocation
4. Motion to reopen vs motion to reconsider — the 30-day window, MTR vs MTC standards
5. AAO appeals — when an AAO appeal is the right channel vs federal court
6. APA challenge in federal court — when the agency's action is "arbitrary and capricious"
7. Mandamus action — when USCIS delay justifies federal-court intervention
8. USCIS Service Center vs Field Office jurisdiction — which forms go where
9. Premium processing — 2024 fee structure, eligible forms, and what "15 business days" actually buys
10. USCIS biometrics — appointments, reuse, and what triggers a new ASC visit

## Bucket 14 — november — DOS, DHS, and inter-agency policy

1. 9 FAM 302 — DOS's consular ineligibility manual and how it interacts with USCIS findings
2. DOS Visa Reciprocity Schedule — country-by-country validity periods and fee differences
3. DHS Secretary's parole authority under §212(d)(5) — scope and limits
4. CBP secondary inspection at the border — your client's right to counsel and the 100-mile zone
5. ICE detainers — INA §287(d) and state / local cooperation policies
6. E-Verify — federal contractor rule, state mandates, and tentative non-confirmation procedures
7. Form I-9 employment verification — Section 1 / 2 / 3 traps and the 2023 remote-verification rule
8. ICE worksite enforcement — Form I-9 audits and Notice of Inspection response
9. CBP One app — appointment scheduling, current scope, and the policy direction
10. DOJ Office of Immigration Litigation — its role in federal-court immigration appeals

## Bucket 15 — oscar — Visa Bulletin, priority dates, and case strategy

1. Reading the Visa Bulletin — Family vs Employment charts, Worldwide / China / India / Mexico / Philippines columns
2. EB-2 / EB-3 cross-chargeability — using a spouse's birth country to escape India / China retrogression
3. EB-2 ROW / India / China — the priority-date math and "current" forecasting
4. EB-3 to EB-2 upgrade — porting via a second PERM / I-140
5. Family preference categories F1 / F2A / F2B / F3 / F4 — current priority-date cuts
6. Child Status Protection Act (CSPA) — the §203(h)(1) age-calculation formula
7. "Sought to acquire" CSPA — Matter of O. Vazquez and what counts within one year
8. DV Diversity Visa lottery — DV-2026 process, the application window, and follow-up at NVC
9. Visa Bulletin "Date for Filing" toggle — when USCIS allows DFF for I-485 filings
10. EB-5 priority-date math — set-asides, the rural / urban / infrastructure carve-outs under RIA 2022

---

## How to claim a bucket

1. Coordinator emails a writer agent with their bucket number,
   the 10-topic list, the editorial brief, the ingestion path
   (`articles-site/src/content/articles/`), and the source-doc
   path (`articles-site/public/source-docs/`).
2. Writer agent acknowledges by reply-all to the coordinator
   thread, then begins. Each topic is one markdown file + one
   downloaded source PDF.
3. When the bucket is complete, the agent opens a PR titled
   `bucket-<NN>-<agent-handle>` with all 10 articles. The
   coordinator merges after a smoke-read.

## Anti-duplication

Buckets are pre-assigned. Within a bucket, a topic is owned by
exactly one agent. If an agent realizes mid-write that a topic
overlaps materially with another bucket's topic, they STOP, email
the coordinator with both topic titles, and the coordinator
adjusts the angle (e.g. one writes the rule, the other writes the
practitioner workflow). Do not double-write.
