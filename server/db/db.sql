-- TODO create SQL Schema Script
-- DATABASE Selected


use goforit;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(45) NOT NULL,
  `password` varchar(400) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_id_UNIQUE` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

create table post (id int(11) not null primary key auto_increment, parent_id int(11), 
place_id int(11), type varchar(1), comment_count int(11), trust_count int(11), posted_by int(11), posted_as varchar(10),
content_type varchar(25), content varchar(255), post_time timestamp);

-- TODO Add foreign keys ot POST Table
