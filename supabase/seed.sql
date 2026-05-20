-- Optional seed data — mirrors src/lib/brands.ts and src/lib/products.ts.
-- Run AFTER schema.sql.

-- Brands -----------------------------------------------------------
insert into brands (slug, name, description) values
  ('rare-beauty',           'Rare Beauty',            'Soft Pinch, Selena Gomez''s gentle glow.'),
  ('charlotte-tilbury',     'Charlotte Tilbury',      'Hollywood glow, cult Pillow Talk.'),
  ('fenty-beauty',          'Fenty Beauty',           'Inclusive shades, runway-ready finish.'),
  ('maybelline',            'Maybelline',             'Drugstore icons — Sky High, Fit Me.'),
  ('anastasia-beverly-hills','Anastasia Beverly Hills','Brow & eye expertise, iconic palettes.'),
  ('nars',                  'NARS',                   'Sensual, French-American colour.'),
  ('huda-beauty',           'Huda Beauty',            'Glam, pigment-rich palettes & lashes.'),
  ('mac',                   'MAC',                    'Pro-loved colour & artistry.'),
  ('e-l-f',                 'e.l.f',                  'Cult buys at gentle prices.'),
  ('milk-makeup',           'Milk Makeup',            'Clean, vegan, multi-use sticks.'),
  ('tom-ford',              'Tom Ford',               'Sleek, decadent luxury beauty.'),
  ('patrick-ta',            'Patrick Ta',             'Celebrity glam, sculpted finishes.'),
  ('ardell',                'Ardell',                 'Lash specialist, salon-grade falsies.'),
  ('dior-beauty',           'Dior Beauty',            'Parisian couture beauty.')
on conflict (slug) do nothing;

-- Products ---------------------------------------------------------
insert into products (slug, name, brand_slug, category, subcategory, price, original_price, condition, description, images, stock, authenticity_note, tags, rating, reviews) values
  ('soft-pinch-liquid-blush-joy',       'Soft Pinch Liquid Blush — Joy',         'rare-beauty',            'cheek', 'liquid-blush', 9800, null, 'new', 'Weightless, blendable liquid blush.', array['https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3b8'], 12, 'Sourced from authorised retailers.', array['viral','new'], 4.8, 42),
  ('pillow-talk-matte-revolution-lipstick','Matte Revolution Lipstick — Pillow Talk','charlotte-tilbury','lips','lipstick',14500,null,'new','Cult nude-pink hydrating matte.',array['https://images.unsplash.com/photo-1586495777744-4413f21062fa'],6,'Boxed, sealed, with batch code.',array['viral'],4.9,88),
  ('fenty-pro-filtr-soft-matte-foundation-240','Pro Filt''r Soft Matte Foundation — 240','fenty-beauty','face','foundation',13500,null,'new','Climate-adaptive soft-matte foundation.',array['https://images.unsplash.com/photo-1631730486572-226d1f595b68'],4,'Imported from authorised stockist. Sealed.',array['new'],4.7,31),
  ('hourglass-veil-mineral-primer','Airbrush Flawless Setting Spray','charlotte-tilbury','face','setting-spray',11200,13500,'new','16-hour magic mist.',array['https://images.unsplash.com/photo-1556228720-195a672e8a03'],9,null,array['offer'],4.6,19),
  ('maybelline-sky-high-mascara','Lash Sensational Sky High Mascara','maybelline','eyes','mascara',3200,null,'new','Limitless length & volume.',array['https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3b8'],22,null,array['viral'],4.7,124),
  ('abh-dipbrow-pomade-ebony','Dipbrow Pomade — Ebony','anastasia-beverly-hills','eyes','eyebrow',6900,null,'new','Waterproof, smudge-proof brow pomade.',array['https://images.unsplash.com/photo-1599387737972-1d27a78f9d65'],7,null,array[]::text[],4.8,56),
  ('nars-orgasm-blush','Blush — Orgasm','nars','cheek','blush',11800,null,'gently-used','Peachy-pink with golden shimmer.',array['https://images.unsplash.com/photo-1612817288484-6f916006741a'],1,'Original purchased from Sephora.',array[]::text[],4.9,12),
  ('huda-obsessions-warm-brown','Obsessions Eyeshadow Palette — Warm Brown','huda-beauty','eyes','eyeshadow',8400,9900,'new','Pocket-size palette with 9 shades.',array['https://images.unsplash.com/photo-1583241800698-9c2e0a4d4f88'],5,null,array['offer'],4.6,27),
  ('mac-ruby-woo-lipstick','Retro Matte Lipstick — Ruby Woo','mac','lips','lipstick',7500,null,'new','The iconic blue-red, retro matte.',array['https://images.unsplash.com/photo-1586495777744-4413f21062fa'],10,null,array[]::text[],4.8,73),
  ('elf-power-grip-primer','Power Grip Primer','e-l-f','face','primer',4200,null,'new','Sticky, gel-based primer with HA.',array['https://images.unsplash.com/photo-1556228720-195a672e8a03'],18,null,array['viral'],4.7,102),
  ('milk-cooling-water-stick','Cooling Water Jelly Tint — Burst','milk-makeup','cheek','liquid-blush',9200,null,'new','Buildable jelly tint for cheeks & lips.',array['https://images.unsplash.com/photo-1620917669809-1af0497965f2'],6,null,array['new'],4.5,14),
  ('tom-ford-shade-and-illuminate','Shade & Illuminate Cream Duo — Intensity 1','tom-ford','cheek','contour',24500,null,'gently-used','Cream sculpting duo for sculpted complexion.',array['https://images.unsplash.com/photo-1599733589046-8a35aa3a2a2f'],1,'Box, sleeve & receipt available.',array['exclusive'],4.9,4),
  ('patrick-ta-major-glow-balm','Major Glow Body Oil','patrick-ta','cheek','highlighter',13800,null,'new','Skin-blurring lit-from-within glow.',array['https://images.unsplash.com/photo-1612817288484-6f916006741a'],3,null,array['new','exclusive'],4.7,9),
  ('ardell-wispies-lashes','Wispies Lashes (3-Pack)','ardell','eyes','eyelashes',2900,null,'new','Classic fluttery wispy lash.',array['https://images.unsplash.com/photo-1583241800698-9c2e0a4d4f88'],25,null,array[]::text[],4.6,48),
  ('dior-lip-glow-oil-rosewood','Lip Glow Oil — Rosewood','dior-beauty','lips','lip-oil',15800,17500,'new','Nourishing plumping lip oil with cherry oil.',array['https://images.unsplash.com/photo-1599733589046-8a35aa3a2a2f'],4,null,array['viral','offer','gift-set'],4.8,38)
on conflict (slug) do nothing;
