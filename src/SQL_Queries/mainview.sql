--This SQL query takes the resource table and joins tags & reactions to complete the data 
--INSTRUCTIONS: un-comment line 3 to remove existing view
--un-comment lines 5 & 55
--drop view resource_main;
--Create or replace view resource_main as (
SELECT 
	resource.resource_id
    , resource.user_id
  	, user_list.user_name
  	, user_list.is_faculty
    , resource.resource_name
    , resource.author_name
    , resource.url
    , con.content_name
    , resource.description
    , resource.post_date
    , resource.build_stage
    , resource.recommendation_nature
    , resource.recommendation_reason
	, react.net_reaction
    , react.upvote_reaction
    , react.downvote_reaction
    , tag.tags
    , com.comment_text_list
    , com.commenter_list
FROM
	resource
LEFT JOIN
  	user_list ON resource.user_id = user_list.user_id
LEFT JOIN 
	(
 		SELECT reaction.resource_id, SUM(reaction.polarity) as net_reaction, SUM(CASE WHEN reaction.polarity > 0 THEN reaction.polarity ELSE 0 END) as upvote_reaction, SUM(CASE WHEN reaction.polarity < 0 THEN reaction.polarity ELSE 0 END) as downvote_reaction
		FROM reaction
		GROUP BY resource_id ORDER BY resource_id
    ) react ON resource.resource_id = react.resource_id
LEFT JOIN
	(
      	SELECT content_link.resource_id as resource_id, content_type.content_name as content_name
		FROM content_link LEFT JOIN content_type 
      	ON content_type.content_id = content_link.content_id
     ) con ON resource.resource_id = con.resource_id
LEFT JOIN
 	(
      	SELECT tag_link.resource_id as resource_id, STRING_AGG(tag_name.tag_name,', ') as tags
		FROM tag_link LEFT JOIN tag_name ON tag_link.tag_id = tag_name.tag_id 
		GROUP BY tag_link.resource_id ORDER BY tag_link.resource_id  
    ) tag ON resource.resource_id = tag.resource_id
LEFT JOIN
	(
    	SELECT comment_list.resource_id AS resource_id, STRING_AGG(user_list.user_name,', ') AS commenter_list, STRING_AGG(comment_list.comment_text,', ') AS comment_text_list
      	FROM comment_list LEFT JOIN user_list ON comment_list.user_id = user_list.user_id
        GROUP BY comment_list.resource_id         ORDER BY comment_list.resource_id
    ) com ON resource.resource_id = com.resource_id
ORDER BY resource.resource_id
--)
