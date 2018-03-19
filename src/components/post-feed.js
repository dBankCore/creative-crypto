import React from 'react';
import Spinner from 'react-spinkit';
import {connect} from 'react-redux';


import './post-feed.css';

import {PostFeedSmallTile} from "./post-feed-small-tile";
import {PostFeedLargeTile} from "./post-feed-large-tile";
// import small and large post feed tiles
import {getRecentPosts} from "../actions/index";

class PostFeed extends React.Component {
	// create post feed with small and large tiles from state and then inject
	componentDidMount() {
		this.props.getRecentPosts();
		// TODO check to see if i have the posts already, then do API call if not
	}

	render() {
		if (this.props.loading) {
			return <Spinner spinnerName="circle" fadeIn='none' />;
		}

		if (this.props.error) {
			return <strong>{this.props.error}</strong>;
		}

		console.log(this.props.posts);

		return this.props.posts.map((post, index) => {
			const title = post.title;
			const body = post.body;
			const bodyPreview = body.slice(0, 70);
			const tags = JSON.parse(post.json_metadata).tags;
			const image = JSON.parse(post.json_metadata).image[0];
			const numberOfVotes = post.active_votes.length;
			const createdData = post.created;
			const pendingPayoutValue = post.pending_payout_value;
			const postUrl = post.url;
			const permlink = post.permlink;
			// i make an array of all small tiles
			// large tile gets hidden on smaller screens

			return (
				<PostFeedSmallTile
					title={title}
					image={image}
					pendingPayoutValue={pendingPayoutValue}
					numberOfVotes={numberOfVotes}
					tags={tags}
					permlink={permlink}/>
			)
		});
	}
}

function mapStateToProps(state) {
	return {
		posts: state.posts,
		loading: state.loading
	};
}

const mapDispatchToProps = {
	getRecentPosts
};

export const ConnectedPostFeed = connect(mapStateToProps, mapDispatchToProps)(PostFeed);
