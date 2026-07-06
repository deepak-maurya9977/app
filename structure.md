# Project Structure

This project is a Vite + React app with Tailwind styling and a custom popup component loaded from a public HTML file.

## Root

- `.git/`
- `.gitignore`
- `components.json`
- `eCommittra_Website_Revamp_AI_Agent_Prompt.md`
- `eslint.config.js`
- `index.html`
- `info.md`
- `netlify.toml`
- `package-lock.json`
- `package.json`
- `postcss.config.js`
- `README.md`
- `tailwind.config.js`
- `tsconfig.app.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `dist/` (build output)
- `node_modules/`
- `public/`
- `src/`

## public/

- `ecommittra_discount_popup_v2.html` - HTML template used by the startup discount popup
- `_redirects`

## src/

- `App.css`
- `App.tsx`
- `index.css`
- `main.tsx`
- `components/`
- `hooks/`
- `lib/`
- `pages/`

## src/components/

- `ContactForm.tsx`
- `DiscountPopup.tsx` - popup wrapper that loads the public HTML
- `FAQAccordion.tsx`
- `FloatingCallButton.tsx`
- `FloatingWhatsApp.tsx`
- `Footer.tsx`
- `HeroBanner.tsx`
- `Layout.tsx`
- `Navbar.tsx`
- `ScrollReveal.tsx`
- `ServicePageTemplate.tsx`
- `StatsCounter.tsx`
- `ui/`

## src/components/ui/

- `accordion.tsx`
- `alert-dialog.tsx`
- `alert.tsx`
- `aspect-ratio.tsx`
- `avatar.tsx`
- `badge.tsx`
- `breadcrumb.tsx`
- `button-group.tsx`
- `button.tsx`
- `calendar.tsx`
- `card.tsx`
- `carousel.tsx`
- `chart.tsx`
- `checkbox.tsx`
- `collapsible.tsx`
- `command.tsx`
- `context-menu.tsx`
- `dialog.tsx`
- `drawer.tsx`
- `dropdown-menu.tsx`
- `empty.tsx`
- `field.tsx`
- `form.tsx`
- `hover-card.tsx`
- `input-group.tsx`
- `input-otp.tsx`
- `input.tsx`
- `item.tsx`
- `kbd.tsx`
- `label.tsx`
- `menubar.tsx`
- `navigation-menu.tsx`
- `pagination.tsx`
- `popover.tsx`
- `progress.tsx`
- `radio-group.tsx`
- `resizable.tsx`
- `scroll-area.tsx`
- `select.tsx`
- `separator.tsx`
- `sheet.tsx`
- `sidebar.tsx`
- `skeleton.tsx`
- `slider.tsx`
- `sonner.tsx`
- `spinner.tsx`
- `switch.tsx`
- `table.tsx`
- `tabs.tsx`
- `textarea.tsx`
- `toggle-group.tsx`
- `toggle.tsx`
- `tooltip.tsx`

## src/hooks/

- `use-mobile.ts`

## src/lib/

- `animations.ts`
- `constants.ts`
- `emailjs.ts`
- `serviceData.ts`
- `utils.ts`

## src/pages/

- `About.tsx`
- `Career.tsx`
- `Contact.tsx`
- `Gallery.tsx`
- `Home.tsx`
- `Services.tsx`
- `services/`

## src/pages/services/

- `accounting-taxation.tsx`
- `amazon-account-launch.tsx`
- `amazon-account-management.tsx`
- `amazon-advertisement.tsx`
- `brand-logo-design.tsx`
- `brand-store.tsx`
- `digital-marketing.tsx`
- `enhance-brand-content.tsx`
- `flipkart-account-launch.tsx`
- `flipkart-account-management.tsx`
- `flipkart-advertisement.tsx`
- `jiomart-account-launch.tsx`
- `jiomart-account-management.tsx`
- `jiomart-advertisement.tsx`
- `listing-cataloging.tsx`
- `meesho-account-launch.tsx`
- `meesho-account-management.tsx`
- `meesho-advertisement.tsx`
- `product-photography.tsx`
- `seller-reinstatement.tsx`
- `warehouse-facility.tsx`
- `website-development.tsx`

## Notes

- `package.json` contains scripts for development, build, lint, and preview.
- The app uses Vite, React, TypeScript, Tailwind CSS, and Radix UI components.
- `public/ecommittra_discount_popup_v2.html` is loaded by `src/components/DiscountPopup.tsx` and controls the launch popup content.
