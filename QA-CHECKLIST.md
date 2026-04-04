# QA Checklist

Manual checks only — things that can't be verified in Playwright.

---

## Visual / Device

- [ ] Homepage layout matches Webflow design on mobile (375px)
- [ ] Homepage layout matches Webflow design on desktop (1440px)
- [ ] About page layout matches Webflow design on mobile and desktop
- [ ] Exhibitions list matches Webflow design on mobile and desktop
- [ ] Single exhibition detail matches Webflow design on mobile and desktop
- [ ] Membership page matches Webflow design on mobile and desktop
- [ ] Hub page matches Webflow design on mobile and desktop
- [ ] CXW 2026 page matches Webflow design on mobile and desktop
- [ ] Custom fonts (ABC ROM) render correctly across all pages
- [ ] Yellow CTA accent color is consistent with Webflow source
- [ ] Homepage masthead parallax scroll effect matches Webflow feel
- [ ] Events ticker scrolls smoothly and loops seamlessly
- [ ] Nav frosted-glass effect renders correctly on homepage (transparent bg)
- [ ] Masthead floating photos position and scale correctly on mobile

## Third-Party / External

- [ ] Klaviyo email signup embed renders and submits on homepage
- [ ] Klaviyo email signup embed renders and submits in Coming Soon modal
- [ ] Resend password reset email actually arrives in inbox

## CMS Content

- [ ] Exhibition titles, dates, venues display correctly after editor entry
- [ ] Published exhibitions appear on frontend; drafts do not
- [ ] About page content updates propagate to frontend after publish
