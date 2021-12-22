import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function DeleteButton({ postId, callback }) {
  // console.log(postId);
  const [confirm, setConfirm] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirm(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = data.getPosts.filter((p) => p.id !== postId);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data,
      });

      if (callback) callback();
    },
    variables: { postId },
  });

  return (
    <React.Fragment>
      <Button as="div" floated="right" onClick={() => setConfirm(true)}>
        <Icon
          name="trash alternate outline "
          color="red"
          style={{ margin: 0 }}
        />
      </Button>
      <Confirm
        open={confirm}
        onCancel={() => confirm(false)}
        onConfirm={deletePost}
      />
    </React.Fragment>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
