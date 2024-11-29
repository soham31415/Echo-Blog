CREATE TABLE posts(
	post_id SERIAL PRIMARY KEY,               -- Auto-incremented unique post ID
    uid INT NOT NULL,                         -- Foreign key to users table
    title VARCHAR(255) NOT NULL,              -- Post title
    content TEXT NOT NULL,                    -- Post content
    status VARCHAR(20) CHECK (status IN ('draft', 'published')) DEFAULT 'draft', -- Post status
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- Timestamp of post creation
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- Timestamp of last update
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
)

CREATE TABLE comments(
	comment_id SERIAL PRIMARY KEY,
	post_id INT NOT NULL,
	uid INT NOT NULL,
	content TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
	FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
)

ALTER TABLE users 
ADD CONSTRAINT unique_uname UNIQUE (uname);

