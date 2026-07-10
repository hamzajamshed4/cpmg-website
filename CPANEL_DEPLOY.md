# CPMG cPanel Deployment (static site + PHP forms)

This replaces the Node server (`server.js`) with a setup that actually works on
cPanel shared hosting: static files for the pages, and small PHP scripts for the
forms. It fixes the two live problems: deep links returning 500, and the booking
form erroring on submit.

## What to upload to public_html

Upload these into your `public_html` folder (keep the `api` folder as a folder):

    index.html
    app.js
    styles.css
    cpmg-logo.png
    sitemap.xml
    robots.txt
    404.html
    500.html
    .htaccess
    api/_lib.php
    api/booking.php
    api/contact.php
    api/careers.php

Do NOT upload `server.js`. It is the old Node server and is not used here.
`.htaccess` files can be hidden in the cPanel File Manager; enable
"Show Hidden Files (dotfiles)" in File Manager settings so you can see it.

## Point the front end at the PHP endpoints

The site posts forms to `/api/booking`, `/api/contact`, `/api/careers`.
The included `.htaccess` rewrites those to the matching `.php` files, so you do
not need to edit `app.js`. If for any reason rewrites are disabled on your host,
the alternative is to change those three paths in `app.js` to end in `.php`.

## Where the leads go

Every submission is emailed to: info@cpmanagementgroup.co.uk
(set as CPMG_INBOX in api/_lib.php). The visitor's own email is set as Reply-To,
so you can reply to them directly.

The From address is no-reply@cpmanagementgroup.co.uk. For best deliverability,
create that mailbox (or at least that address) in cPanel > Email Accounts, and
make sure SPF and DKIM are enabled for the domain (cPanel > Email Deliverability).

## Test after uploading

1. Open https://cpmanagementgroup.co.uk/services/domestic/carpet-cleaning
   directly (not by clicking). It should load, not show a 500.
2. Refresh that page. It should still load.
3. Complete a booking and submit. You should see the success message and an
   email should arrive at info@cpmanagementgroup.co.uk within a few minutes.
   Check the spam folder the first time.

## Known trade-off

Because pages are now static, the initial HTML title/description is the homepage
default; `app.js` updates them per page after it loads. Google renders JavaScript,
so this is acceptable, but it is weaker than server-rendered per-page meta tags.
If per-page meta in the raw HTML matters to you later, that needs either the Node
host the original code was built for, or pre-rendered HTML per route.
