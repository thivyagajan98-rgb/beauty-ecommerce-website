-- Optional seed data — mirrors src/lib/brands.ts and src/lib/products.ts.
-- Run AFTER schema.sql.

-- Brands -----------------------------------------------------------
insert into brands (slug, name, description) values
  ('charlotte-tilbury',     'Charlotte Tilbury',      'Hollywood glow, cult Pillow Talk.'),
  ('dior',                  'Dior',                   'Parisian couture beauty.'),
  ('huda-beauty',           'Huda Beauty',            'Glam, pigment-rich palettes & lashes.'),
  ('fenty-beauty',          'Fenty Beauty',           'Inclusive shades, runway-ready finish.'),
  ('maybelline',            'Maybelline',             'Drugstore icons — Sky High, Fit Me.'),
  ('rare-beauty',           'Rare Beauty',            'Soft Pinch, Selena Gomez''s gentle glow.'),
  ('one-size',              'One Size',               'Expert formulas by Patrick Starrr.'),
  ('nars',                  'NARS',                   'Sensual, French-American colour.'),
  ('morphe',                'Morphe',                 'Pro-quality palettes & brushes.'),
  ('bobbi-brown',           'Bobbi Brown',            'Modern, skin-first essentials.'),
  ('tarte',                 'Tarte',                  'Shape Tape & cheeky tints.')
on conflict (slug) do nothing;

-- Products ---------------------------------------------------------
insert into products (slug, name, brand_slug, category, subcategory, price, original_price, condition, description, images, stock, authenticity_note, tags, rating, reviews) values
  ('soft-pinch-liquid-blush-joy',                      'Soft Pinch Liquid Blush — Joy',                'rare-beauty',       'cheek', 'liquid-blush',     9800,  null, 'new', 'Weightless, blendable liquid blush.',                  array['https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3b8'], 12, 'Sourced from authorised retailers.', array['viral','new'],     4.8, 42),
  ('pillow-talk-matte-revolution-lipstick',            'Matte Revolution Lipstick — Pillow Talk',      'charlotte-tilbury', 'lips',  'lipstick',         14500, null, 'new', 'Cult nude-pink hydrating matte.',                       array['https://images.unsplash.com/photo-1586495777744-4413f21062fa'],  6, 'Boxed, sealed, with batch code.', array['viral'],           4.9, 88),
  ('charlotte-tilbury-airbrush-flawless-setting-spray','Airbrush Flawless Setting Spray',              'charlotte-tilbury', 'face',  'setting-spray',    11200, 13500,'new', '16-hour magic mist.',                                   array['https://images.unsplash.com/photo-1556228720-195a672e8a03'],     9, null, array['offer'],                                            4.6, 19),
  ('fenty-pro-filtr-soft-matte-foundation-240',        'Pro Filt''r Soft Matte Foundation — 240',      'fenty-beauty',      'face',  'foundation',       13500, null, 'new', 'Climate-adaptive soft-matte foundation.',               array['https://images.unsplash.com/photo-1631730486572-226d1f595b68'],  4, 'Imported from authorised stockist. Sealed.', array['new'],                                   4.7, 31),
  ('fenty-stunna-lip-paint-uncensored',                'Stunna Lip Paint — Uncensored',                'fenty-beauty',      'lips',  'liquid-lipstick',  10800, null, 'new', 'Universal-flattering red liquid lipstick.',             array['https://images.unsplash.com/photo-1599733589046-8a35aa3a2a2f'],  7, null, array['viral','new'],                                     4.7, 56),
  ('maybelline-sky-high-mascara',                      'Lash Sensational Sky High Mascara',            'maybelline',        'eyes',  'mascara',          3200,  null, 'new', 'Limitless length & volume.',                            array['https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3b8'], 22, null, array['viral'],                                           4.7, 124),
  ('nars-orgasm-blush',                                'Blush — Orgasm',                               'nars',              'cheek', 'blush',            11800, null, 'new', 'Peachy-pink with golden shimmer.',                      array['https://images.unsplash.com/photo-1612817288484-6f916006741a'],  5, 'Boxed, sealed, with batch code.', array[]::text[],          4.9, 32),
  ('huda-obsessions-warm-brown',                       'Obsessions Eyeshadow Palette — Warm Brown',    'huda-beauty',       'eyes',  'eyeshadow',        8400,  9900, 'new', 'Pocket-size palette with 9 shades.',                    array['https://images.unsplash.com/photo-1583241800698-9c2e0a4d4f88'],  5, null, array['offer'],                                           4.6, 27),
  ('dior-lip-glow-oil-rosewood',                       'Lip Glow Oil — Rosewood',                      'dior',              'lips',  'lip-oil',          15800, 17500,'new', 'Nourishing plumping lip oil with cherry oil.',          array['https://images.unsplash.com/photo-1599733589046-8a35aa3a2a2f'],  4, null, array['viral','offer','gift-set'],                        4.8, 38),
  ('one-size-on-til-dawn-setting-spray',               'On ''Til Dawn Setting Spray',                  'one-size',          'face',  'setting-spray',    12500, null, 'new', 'All-night-wear setting spray, 24-hour lock.',           array['https://images.unsplash.com/photo-1556228720-195a672e8a03'],     6, null, array['new'],                                             4.6, 14),
  ('morphe-35o-nature-glow-eyeshadow-palette',         '35O Original Nature Glow Eyeshadow Palette',   'morphe',            'eyes',  'eyeshadow',        8900,  null, 'new', '35 buttery shades from mattes to molten metallics.',    array['https://images.unsplash.com/photo-1583241800698-9c2e0a4d4f88'],  4, null, array['viral'],                                           4.7, 61),
  ('bobbi-brown-luxe-lip-color-pink-nude',             'Luxe Lip Color — Pink Nude',                   'bobbi-brown',       'lips',  'lipstick',         9800,  null, 'new', 'Creamy hydrating pigment in a sleek metal bullet.',     array['https://images.unsplash.com/photo-1586495777744-4413f21062fa'],  8, null, array['new'],                                             4.6, 22),
  ('tarte-shape-tape-concealer-fair-light-neutral',    'Shape Tape Concealer — Fair Light Neutral',    'tarte',             'face',  'concealer',        7800,  null, 'new', 'Award-winning full-coverage concealer.',                array['https://images.unsplash.com/photo-1631730486572-226d1f595b68'], 11, null, array['viral'],                                           4.8, 73)
on conflict (slug) do nothing;
