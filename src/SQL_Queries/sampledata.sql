INSERT into user_list 
	(user_name, is_faculty) 
VALUES 
  	( 'Roshni','false' ),
	( 'Temi','false' ),
  	( 'Emmanuel','false' ),
  	( 'Tiff','false' ),
  	( 'Mat','false' ),
  	( 'King Neill','true' )   
;
INSERT into tag_name
  	(tag_name)
VALUES 
  	('sample_tag1'),
	('sample_tag2'),
  	('sample_tag3'),
  	('sample_tag4'),
  	('sample_tag5')
;
INSERT into content_type 
	(content_name)
VALUES
	( 'sample_content_type1' ),
    ( 'sample_content_type2' ),
    ( 'sample_content_type3' ),
    ( 'sample_content_type4' ),
    ( 'sample_content_type5' )
;
INSERT into resource 
	(user_id, resource_name, author_name, url, description, build_stage, recommendation_nature, recommendation_reason) 
VALUES 
	(1, 'sample resource 1', 'Mr. Writer', 'www.something.com', 'this is a description', 'build stage 1-2', 'I recommend this resource after having used it', 'I absolutely loved this thing'),
    (2, 'sample resource 2', 'Mr. Writer', 'www.somethingelse.com', 'this is a description', 'build stage 1-2', 'I recommend this resource after having used it', 'I absolutely loved this thing'),
	(3, 'sample resource 3', 'Mr. Writer', 'www.somethingother.com', 'this is a description', 'build stage 1-2', 'I recommend this resource after having used it', 'I absolutely loved this thing'),
    (4, 'sample resource 4', 'Mr. Writer', 'www.somethingnew.com', 'this is a description', 'build stage 1-2', 'I recommend this resource after having used it', 'I absolutely loved this thing'),
    (5, 'sample resource 5', 'Mr. Writer', 'www.somethingold.com', 'this is a description', 'build stage 1-2', 'I recommend this resource after having used it', 'I absolutely loved this thing'),
    (6, 'sample resource 6', 'Mr. Writer', 'www.somethingtired.com', 'this is a description', 'build stage 1-2', 'I recommend this resource after having used it', 'I absolutely loved this thing')
;
INSERT into comment_list 
	(user_id, resource_id, comment_text) 
VALUES 
  	(5, 3, 'This is a load of rubbish'),
  	(5, 4, 'This is ace'),
  	(5, 5, 'No idea what he is talking about')
;
INSERT into content_link 
	(content_id, resource_id) 
VALUES 
	(1,3),
    (5,4),
    (4,5),
    (2,6),
    (3,7),	
    (1,8)
    ;
INSERT into reaction 
	(resource_id, user_id, polarity) 
VALUES
	(3,1,1),
    (3,6,1), 
    (3,4,1),
    (4,2,1),
    (4,5,-1),
    (5,3,1),
    (5,4,1),
    (5,6,1),
    (6,4,-1),
    (6,3,-1),
    (6,1,1),
    (7,5,1),
    (7,2,1),
    (8,6,-1),
    (8,1,1),
    (8,3,1)
    ;  
INSERT into tag_link 
	(tag_id, resource_id) 
VALUES 
    (1,3),
    (2,4),
    (3,5),
    (4,6),
    (5,7),
    (5,8),    
    (1,8)      
;
INSERT into study_list 
	(user_id, resource_id) 
VALUES 
  (1,3),
  (1,4), 
  (1,5),
  (2,4),
  (2,5),
  (2,6),
  (3,7)
;