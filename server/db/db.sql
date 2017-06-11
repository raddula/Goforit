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
