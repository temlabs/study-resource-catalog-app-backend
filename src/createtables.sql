CREATE TABLE user_list ( 
	user_id SERIAL PRIMARY KEY,
	user_name varchar(255) UNIQUE,
	is_faculty boolean
);
CREATE TABLE tag_name ( 
  	tag_id SERIAL PRIMARY KEY,
	tag_name varchar(255)
);
CREATE TABLE content_type ( 
  	content_id SERIAL PRIMARY KEY,
	content_name varchar(255)
);
CREATE TABLE resource ( 
	resource_id SERIAL PRIMARY KEY,
	user_id int,
	resource_name varchar(255),
	author_name varchar(255),
	url text UNIQUE,
	description varchar(255),
	post_date timestamp,
	build_stage varchar(255),
	recommendation_nature varchar(255),
	recommendation_reason varchar(255), 
  		FOREIGN KEY (user_id) REFERENCES user_list(user_id)
);
CREATE TABLE comment_list ( 
    comment_id SERIAL PRIMARY KEY,
  	user_id int,
	resource_id int,
	comment_text text,
    	FOREIGN KEY (resource_id) REFERENCES resource(resource_id),
 		FOREIGN KEY (user_id) REFERENCES user_list(user_id)
);
CREATE TABLE content_link (
	content_link_id SERIAL PRIMARY KEY,
  	content_id int,
	resource_id int,
  		FOREIGN KEY (content_id) REFERENCES content_type(content_id),
    	FOREIGN KEY (resource_id) REFERENCES resource(resource_id),
  		UNIQUE (content_id, resource_id)
);
CREATE TABLE reaction ( 
  	reaction_id SERIAL PRIMARY KEY,
    resource_id int,
	user_id int,
	polarity int,
    	FOREIGN KEY (resource_id) REFERENCES resource(resource_id),
 		FOREIGN KEY (user_id) REFERENCES user_list(user_id),
  		UNIQUE (resource_id, user_id)
);
CREATE TABLE tag_link ( 
   	tag_link_id SERIAL PRIMARY KEY, 	
  	tag_id int,
	resource_id int,
  		FOREIGN KEY (tag_id) REFERENCES tag_name(tag_id),
    	FOREIGN KEY (resource_id) REFERENCES resource(resource_id),
  		UNIQUE (tag_id, resource_id)
);
CREATE TABLE study_list ( 
   	study_list_id SERIAL PRIMARY KEY, 	
  	user_id int,
	resource_id int,
  		FOREIGN KEY (user_id) REFERENCES user_list(user_id),
    	FOREIGN KEY (resource_id) REFERENCES resource(resource_id),
  		UNIQUE (user_id, resource_id)
);
