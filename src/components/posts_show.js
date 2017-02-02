import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount() {
		this.props.getPost(this.props.params.id);
	}

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
			.then(() => {
				this.context.router.push("/posts");
			});
	}

	render() {
		const post = this.props.post;

		if (!post) {
			return <div>LOADING</div>
		}
		
		return(
			<div>
				<h3>{post.title}</h3>
				<h4>{post.categories}</h4>
				<p>{post.content}</p>
				<Link to="/posts" className="btn btn-primary">Back</Link>
				<button
					onClick={this.onDeleteClick.bind(this)} 
					className="btn btn-danger">Delete</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		post: state.posts.post
	};
}

export default connect(mapStateToProps, { getPost, deletePost })(PostsShow);