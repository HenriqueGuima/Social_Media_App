import React from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function PostCard({
  post: {
    body,
    createdAt,
    username,
    id,
    likeCount,
    likes,
    commentCount,
    comments,
  },
}) {
  function likePost() {
    console.log("Like was clicked");
  }
  function commentPost() {
    console.log("Comment was clicked");
  }
  return (
    <React.Fragment>
      <Card fluid>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as="div" labelPosition="right" onClick={likePost}>
            <Button color="teal">
              <Icon name="arrow up" />
            </Button>
            <Label as="a" basic color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right" onClick={commentPost}>
            <Button color="blue">
              <Icon name="comments" />
            </Button>
            <Label as="a" basic color="teal" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </Card.Content>
      </Card>
    </React.Fragment>
  );
}
