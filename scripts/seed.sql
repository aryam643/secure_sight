-- Insert cameras
INSERT INTO cameras (name, location) VALUES
('Shop Floor Camera A', 'Main Shop Floor'),
('Vault Camera', 'Security Vault'),
('Entrance Camera', 'Main Entrance');

-- Insert incidents with realistic timestamps over 24 hours
INSERT INTO incidents (camera_id, type, ts_start, ts_end, thumbnail_url, resolved) VALUES
-- Shop Floor Camera A incidents
(1, 'Unauthorised Access', '2025-07-26 14:35:00', '2025-07-26 14:37:00', '/images/jewelry-store.png', false),
(1, 'Gun Threat', '2025-07-26 16:22:00', '2025-07-26 16:25:00', '/images/jewelry-store.png', false),
(1, 'Unauthorised Access', '2025-07-26 18:45:00', '2025-07-26 18:48:00', '/images/jewelry-store.png', false),
(1, 'Face Recognised', '2025-07-26 20:15:00', '2025-07-26 20:17:00', '/images/jewelry-store.png', true),

-- Vault Camera incidents  
(2, 'Unauthorised Access', '2025-07-26 02:30:00', '2025-07-26 02:35:00', '/images/jewelry-store.png', false),
(2, 'Motion Detected', '2025-07-26 08:15:00', '2025-07-26 08:18:00', '/images/jewelry-store.png', true),
(2, 'Gun Threat', '2025-07-26 12:45:00', '2025-07-26 12:50:00', '/images/jewelry-store.png', false),
(2, 'Face Recognised', '2025-07-26 22:30:00', '2025-07-26 22:32:00', '/images/jewelry-store.png', true),

-- Entrance Camera incidents
(3, 'Unauthorised Access', '2025-07-26 06:20:00', '2025-07-26 06:25:00', '/images/jewelry-store.png', false),
(3, 'Face Recognised', '2025-07-26 09:45:00', '2025-07-26 09:47:00', '/images/jewelry-store.png', true),
(3, 'Traffic Congestion', '2025-07-26 17:30:00', '2025-07-26 17:35:00', '/images/jewelry-store.png', false),
(3, 'Motion Detected', '2025-07-26 23:15:00', '2025-07-26 23:18:00', '/images/jewelry-store.png', true),
(3, 'Unauthorised Access', '2025-07-27 01:45:00', '2025-07-27 01:50:00', '/images/jewelry-store.png', false);
