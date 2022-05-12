-- This SQL query takes the resource table and joins tags & reactions to complete the data 
Create or replace view resource_main as (
SELECT 
	resource.resource_id,
    resource.user_id,
    resource.resource_name,
    resource.author_name,
    resource.url,
    resource.description,
    resource.post_date,
    resource.build_stage,
    resource.recommendation_nature,
    resource.recommendation_reason,
    STRING_AGG(tag_name.tag_name,', ') as tags,
    SUM(reaction.polarity) as net_reaction,
    SUM(CASE WHEN reaction.polarity > 0 THEN reaction.polarity ELSE 0 END) as upvote_reaction,
    SUM(CASE WHEN reaction.polarity < 0 THEN reaction.polarity ELSE 0 END) as downvote_reaction
FROM
	resource
LEFT JOIN        
 	reaction ON resource.resource_id = reaction.resource_id
LEFT JOIN
	tag_link ON resource.resource_id = tag_link.resource_id
LEFT JOIN
 	tag_name ON tag_link.tag_id = tag_name.tag_id
GROUP BY
	resource.resource_id,
    resource.user_id,
    resource.resource_name,
    resource.author_name,
    resource.url,
    resource.description,
    resource.post_date,
    resource.build_stage,
    resource.recommendation_nature,
    resource.recommendation_reason
)