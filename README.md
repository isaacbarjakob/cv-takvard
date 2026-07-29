# C&V Takvård – publiceringsklar

Kontaktformulären skickar direkt till `cv_takvard@hotmail.com` via Cloudflare Pages Function och Resend. Det finns ingen mailto-öppning eller mejlfallback i formuläret.

## Cloudflare Pages

- Build command: lämnas tom
- Output directory: `.`
- Lägg till miljövariabeln `RESEND_API_KEY` i **Settings → Variables and Secrets**
- Lägg till `CONTACT_TO_EMAIL` med värdet `cv_takvard@hotmail.com`
- Lägg till `CONTACT_FROM_EMAIL` med en verifierad avsändaradress i Resend, exempelvis `C&V Takvård <offert@din-verifierade-domän.se>`

Efter att variablerna sparats måste en ny deployment göras.

`ll-admin.json` innehåller fälten som LL Admin ska styra. Öppettider och erbjudanden är avstängda.
