// -- On refresh, UI gets only the pending content 
{
	"place_id": "544",
	"place_name": "Gas station XXX",
	"place_address": "2342 XXXX Ave, Fremont, CA, 94536",
	"user_name": "Sample",
	"user_id": "111",
	
	"post": [{
		"post_id": "11",
		"post_content": "This is sample post",
		"content_type": "T",
		"posted_by": "Ram",
		"posted_on": "Dec 9, 2016 12:00 pm",
		
		"comment": [{
			"comment_id": "111",
			"comment_content": "How r u?",
			"content_type": "T",
			"commented_on": "Dec 9, 2016 1:21 pm"
		},
		{
			"comment_id": "112",
			"comment_content": "/content/comment/xyz.gif",
			"content_type": "I",
			"commented_on": "Dec 9, 2016 12.30 pm"
		}],
		
		"trust_factor": "123"
	},
	
	{
		"post_id": "16",
		"post_content": "This is sample post - 2",
		"content_type": "T",
		"posted_by": "Ram xyz",
		"posted_on": "Dec 9, 2016 12:05 pm",
		
		"comment": [{
			"comment_id": "123",
			"comment_content": "How r u?",
			"content_type": "T",
			"commented_on": "Dec 9, 2016 1:21 pm"
		},
		{
			"comment_id": "112",
			"comment_content": "/content/comment/xyz.gif",
			"content_type": "I",
			"commented_on": "Dec 9, 2016 12.20 pm"
		}],
		
		"trust_factor": "23"
	}],
		
	pending_posts: 0,
	pending_comments: 0,
	trusts_by_hosts: 234,
	trusts_by_guests: 786 
}
