#!/bin/sh
# Single owner of "which paths change what public/resume.pdf renders". Sourced by
# .husky/pre-commit and .github/workflows/resume-pdf.yml; a second copy would
# drift and silently stop regenerating or checking the committed PDF.
#
# scripts/process-lifecycle.ts is deliberately absent: it changes how bytes reach
# disk, not what the page renders. app/(site)/layout.tsx too, since /resume sits
# outside the (site) route group and that layout never wraps it.
resume_sources_pattern='^(app/resume/|app/layout\.tsx|app/globals\.css|scripts/generate-resume\.ts)'
