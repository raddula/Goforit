-- TODO create SQL Schema Script 
-- DATABASE Selected 
USE goforit; 

DROP TABLE trust_place; 

DROP TABLE trust_post; 

DROP TABLE comment; 

DROP TABLE post; 

DROP TABLE place_membership; 

DROP TABLE place; 

DROP TABLE user_friend; 

DROP TABLE user; 

CREATE TABLE user 
  ( 
     user_id          BIGINT PRIMARY KEY, 
     first_name       VARCHAR(45), 
     last_name        VARCHAR(45), 
     password         VARCHAR(45), 
     email_address    VARCHAR(45), 
     phone_number     BIGINT, 
     created_on       TIMESTAMP, 
     pending_posts    INT, 
     pending_comments INT, 
     trust_factor     BIGINT, 
     UNIQUE KEY (email_address) 
  ); 

CREATE TABLE user_friend 
  ( 
     user_id     BIGINT, 
     friend_id   BIGINT, 
     friend_type VARCHAR(10), 
     FOREIGN KEY(user_id) REFERENCES user(user_id), 
     FOREIGN KEY(friend_id) REFERENCES user(user_id) 
  ); 

CREATE TABLE place 
  ( 
     place_id      BIGINT PRIMARY KEY, 
     place_name    VARCHAR(45), 
     place_address VARCHAR(255), 
     created_by    BIGINT, 
     created_on    TIMESTAMP, 
     topic_name    VARCHAR(20), 
     FOREIGN KEY (created_by) REFERENCES user(user_id) 
  ); 

CREATE TABLE post 
  ( 
     post_id      BIGINT PRIMARY KEY, 
     place_posted BIGINT, 
     posted_by    BIGINT, 
     posted_on    TIMESTAMP, 
     post_content VARCHAR(255), 
     content_type VARCHAR(10), 
     FOREIGN KEY(place_posted) REFERENCES place(place_id), 
     FOREIGN KEY(posted_by) REFERENCES user(user_id) 
  ); 

CREATE TABLE comment 
  ( 
     comment_id      BIGINT PRIMARY KEY, 
     parent_post_id  BIGINT, 
     commented_by    BIGINT, 
     commented_on    TIMESTAMP, 
     comment_content VARCHAR(255), 
     content_type    VARCHAR(10), 
     FOREIGN KEY(parent_post_id) REFERENCES post(post_id), 
     FOREIGN KEY(commented_by) REFERENCES user(user_id) 
  ); 

CREATE TABLE trust_post 
  ( 
     trust_id     BIGINT PRIMARY KEY, 
     trusted_by   BIGINT, 
     trusted_post BIGINT, 
     trusted_user BIGINT, 
     trusted_on   TIMESTAMP, 
     FOREIGN KEY(trusted_by) REFERENCES user(user_id), 
     FOREIGN KEY(trusted_post) REFERENCES post(post_id), 
     FOREIGN KEY(trusted_user) REFERENCES user(user_id) 
  ); 

CREATE TABLE trust_place 
  ( 
     trust_id      BIGINT PRIMARY KEY, 
     trusted_by    BIGINT, 
     trusted_place BIGINT, 
     trusted_user  BIGINT, 
     trusted_on    TIMESTAMP, 
     FOREIGN KEY(trusted_by) REFERENCES user(user_id), 
     FOREIGN KEY(trusted_place) REFERENCES place(place_id), 
     FOREIGN KEY(trusted_user) REFERENCES user(user_id) 
  ); 

CREATE TABLE place_membership 
  ( 
     membership_id   BIGINT PRIMARY KEY, 
     place_id        BIGINT, 
     member_id       BIGINT, 
     membership_type VARCHAR(10), 
     FOREIGN KEY(place_id) REFERENCES place(place_id), 
     FOREIGN KEY(member_id) REFERENCES user(user_id) 
  ); 

COMMIT; 