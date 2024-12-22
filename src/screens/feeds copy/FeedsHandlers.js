import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

// like video
export const handleLikePress = async (
  item,
  allFeedsCollection,
  setAllFeedsCollection,
  userID,
  internetState,
  currentHorizontalIndex,
  setLiked,
) => {
  const updatedFeedsLikes = [...allFeedsCollection];
  let feedindex1 = 0;

  const selectedFeedArray = updatedFeedsLikes[currentHorizontalIndex];
  if (currentHorizontalIndex !== 0) {
    feedindex1 = updatedFeedsLikes[0].findIndex(
      feed => feed.id === item.id && feed.index === item.index,
    );
  }

  const feedIndex = selectedFeedArray.findIndex(
    feed => feed.id === item.id && feed.index === item.index,
  );
  if (feedIndex === -1) return;
  const initialLikes = item.likes || 0;
  const newLikes = item.liked ? initialLikes - 1 : initialLikes + 1;
  const liked = item.liked;
  setLiked(!liked);
  updateFeedLikes(
    feedIndex,
    newLikes,
    !liked,
    allFeedsCollection,
    setAllFeedsCollection,
    currentHorizontalIndex,
  );
  if (!internetState) {
    setTimeout(() => {
      setLiked(liked);
      revertFeedLikes(
        feedIndex,
        initialLikes,
        liked,
        allFeedsCollection,
        setAllFeedsCollection,
        currentHorizontalIndex,
      );
    }, 2000);
    return;
  }
  try {
    const batch = firestore().batch();
    const feedDocRef = firestore().collection('feeds').doc(item.id);
    const userDocRef = firestore().collection('users').doc(userID);

    const feedDoc = await feedDocRef.get();
    if (!feedDoc.exists) {
      throw new Error('Document does not exist');
    }
    const feedsArray = feedDoc.data().feeds;
    feedsArray[item.index].likes = newLikes;
    batch.update(feedDocRef, {feeds: feedsArray});

    const userDoc = await userDocRef.get();
    let likedVideos = [];
    if (userDoc.exists) {
      const userData = userDoc.data();
      likedVideos = userData.likedVideos || [];
    }
    const videoIndex = likedVideos.findIndex(
      video => video.id === item.id && video.index === item.index,
    );
    if (videoIndex === -1) {
      if (!liked) {
        likedVideos.push({id: item.id, index: item.index, liked: true});
      }
    } else {
      likedVideos[videoIndex].liked = !likedVideos[videoIndex].liked;
    }
    batch.set(userDocRef, {likedVideos: likedVideos}, {merge: true});
    await batch.commit();
  } catch (error) {
    console.log('Error updating like status:', error);
    setTimeout(() => {
      setLiked(liked);
      revertFeedLikes(
        feedIndex,
        initialLikes,
        liked,
        allFeedsCollection,
        setAllFeedsCollection,
        currentHorizontalIndex,
      );
      Snackbar.show({
        text: 'Failed to update the like status',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 2000);
  }
};

const updateFeedLikes = (
  feedIndex,
  newLikes,
  liked,
  allFeedsCollection,
  setAllFeedsCollection,
  currentHorizontalIndex,
) => {
  const updatedFeedsLikes = [...allFeedsCollection];
  const feed = updatedFeedsLikes[currentHorizontalIndex][feedIndex];
  feed.likes = newLikes;
  feed.liked = liked;
  setAllFeedsCollection(updatedFeedsLikes);
};

const revertFeedLikes = (
  feedIndex,
  initialLikes,
  liked,
  allFeedsCollection,
  setAllFeedsCollection,
  currentHorizontalIndex,
) => {
  const revertedFeedsLikes = [...allFeedsCollection];
  const feed = revertedFeedsLikes[currentHorizontalIndex][feedIndex];
  feed.likes = initialLikes;
  feed.liked = liked;
  setAllFeedsCollection(revertedFeedsLikes);
};

// update like of comment
// export const handleLikeComment = async (comment, allFeedsCollection, setAllFeedsCollection, selectedItem, userID, internetState,currentIndex,currentHorizontalIndex) => {
//   console.log("Liked comment",selectedItem.id, selectedItem.index );

//   const findCommentIndex = comment.commentIndex
//   console.log(findCommentIndex);

//   const updatedFeedsCollection = [...allFeedsCollection[currentHorizontalIndex][currentIndex]];
//   const feedIndex = updatedFeedsCollection.findIndex((feed: any) => feed.id === selectedItem.id && feed.index === selectedItem.index);
//   const commentIndex = updatedFeedsCollection[feedIndex].comments.findIndex(comment => comment.commentIndex === findCommentIndex)
//   if (commentIndex === -1) return;
//   const initialLikes = comment.likes || 0;
//   const newLikes = comment.commentLiked ? initialLikes - 1 : initialLikes + 1;
//   const commentLiked = comment.commentLiked;
//   updateCommentLikes(feedIndex, commentIndex, newLikes, !commentLiked, allFeedsCollection, setAllFeedsCollection);
//   if (!internetState) {
//     setTimeout(() => {
//       revertCommentLikes(feedIndex, commentIndex, initialLikes, commentLiked, allFeedsCollection, setAllFeedsCollection);
//     }, 2000)
//     return;
//   }

//   try {
//     const batch = firestore().batch();
//     const feedDocRef = firestore().collection('feeds').doc(selectedItem.id);
//     const userDocRef = firestore().collection('users').doc(userID);

//     const feedDoc = await feedDocRef.get();
//     if (!feedDoc.exists) {
//       throw new Error('Document does not exist');
//     }
//     const feedsArray = feedDoc.data().feeds;
//     feedsArray[selectedItem.index].comments[commentIndex].likes = newLikes;
//     batch.update(feedDocRef, { feeds: feedsArray });

//     const userDoc = await userDocRef.get();
//     let likedVideos = userDoc.data()?.likedVideos || [];
//     if (userDoc.exists) {
//       const userData = userDoc.data();
//       likedVideos = userData.likedVideos || [];
//     }
//     const videoIndex = likedVideos.findIndex(video => video.id === selectedItem.id && video.index === selectedItem.index);
//     if (videoIndex !== -1) {
//       if (!likedVideos[videoIndex].likedComments) {
//         likedVideos[videoIndex].likedComments = [];
//       }
//       const likedCommentIndex = likedVideos[videoIndex].likedComments.findIndex((likedComment: any) => likedComment.commentIndex === commentIndex);
//       if (likedCommentIndex === -1) {
//         likedVideos[videoIndex].likedComments.push({ commentIndex: commentIndex, commentLiked: true });
//       } else {
//         likedVideos[videoIndex].likedComments[likedCommentIndex].commentLiked = !likedVideos[videoIndex].likedComments[likedCommentIndex].commentLiked;
//       }
//     } else {
//       likedVideos.push({
//         id: selectedItem.id,
//         index: selectedItem.index,
//         liked: false,
//         likedComments: [{ commentIndex: commentIndex, commentLiked: true }]
//       });
//     }
//     batch.set(userDocRef, { likedVideos: likedVideos }, { merge: true });
//     await batch.commit();
//   } catch (error) {
//     console.log('Error updating comment like status:', error);
//     setTimeout(() => {
//       revertCommentLikes(feedIndex, commentIndex, initialLikes, commentLiked, allFeedsCollection, setAllFeedsCollection);
//       Snackbar.show({
//         text: 'Failed to update comment like status',
//         duration: Snackbar.LENGTH_SHORT,
//       });
//     }, 2000)
//   }
// };

// const updateCommentLikes = (feedIndex, commentIndex, newLikes, commentLiked, allFeedsCollection, setAllFeedsCollection) => {
//   const updatedCommentLikes = [...allFeedsCollection];
//   const comment = updatedCommentLikes[feedIndex].comments[commentIndex];
//   comment.likes = newLikes;
//   comment.commentLiked = commentLiked;
//   setAllFeedsCollection(updatedCommentLikes);
// };
export const handleLikeComment = async (
  comment,
  allFeedsCollection,
  setAllFeedsCollection,
  selectedItem,
  userID,
  internetState,
  currentIndex,
  currentHorizontalIndex,
) => {
  const findCommentIndex = comment.commentIndex;

  // Access the nested array structure
  const updatedFeedsCollection = [...allFeedsCollection];
  const selectedFeedArray = updatedFeedsCollection[currentHorizontalIndex]; // Get the array of feeds at currentHorizontalIndex

  // Find the specific feed item
  const feedIndex = selectedFeedArray.findIndex(
    feed => feed.id === selectedItem.id && feed.index === selectedItem.index,
  );

  if (feedIndex === -1) return;

  // Find the comment inside that feed
  const commentIndex = selectedFeedArray[feedIndex].comments.findIndex(
    comment => comment.commentIndex === findCommentIndex,
  );

  if (commentIndex === -1) return;

  // Update the like status
  const initialLikes = comment.likes || 0;
  const newLikes = comment.commentLiked ? initialLikes - 1 : initialLikes + 1;
  const commentLiked = comment.commentLiked;

  // Update the UI optimistically
  updateCommentLikes(
    currentHorizontalIndex,
    feedIndex,
    commentIndex,
    newLikes,
    !commentLiked,
    allFeedsCollection,
    setAllFeedsCollection,
  );

  if (!internetState) {
    // Revert after a delay if no internet
    setTimeout(() => {
      revertCommentLikes(
        currentHorizontalIndex,
        feedIndex,
        commentIndex,
        initialLikes,
        commentLiked,
        allFeedsCollection,
        setAllFeedsCollection,
      );
    }, 2000);
    return;
  }

  // Try updating Firestore in a batch
  try {
    const batch = firestore().batch();
    const feedDocRef = firestore().collection('feeds').doc(selectedItem.id);
    const userDocRef = firestore().collection('users').doc(userID);

    const feedDoc = await feedDocRef.get();
    if (!feedDoc.exists) {
      throw new Error('Document does not exist');
    }

    // Update the Firestore feed document with new comment likes
    const feedsArray = feedDoc.data().feeds;
    feedsArray[selectedItem.index].comments[commentIndex].likes = newLikes;
    batch.update(feedDocRef, {feeds: feedsArray});

    const userDoc = await userDocRef.get();
    let likedVideos = userDoc.data()?.likedVideos || [];

    // Handle the user's liked comments
    const videoIndex = likedVideos.findIndex(
      video =>
        video.id === selectedItem.id && video.index === selectedItem.index,
    );
    if (videoIndex !== -1) {
      if (!likedVideos[videoIndex].likedComments) {
        likedVideos[videoIndex].likedComments = [];
      }
      const likedCommentIndex = likedVideos[videoIndex].likedComments.findIndex(
        likedComment => likedComment.commentIndex === commentIndex,
      );
      if (likedCommentIndex === -1) {
        likedVideos[videoIndex].likedComments.push({
          commentIndex: commentIndex,
          commentLiked: true,
        });
      } else {
        likedVideos[videoIndex].likedComments[likedCommentIndex].commentLiked =
          !likedVideos[videoIndex].likedComments[likedCommentIndex]
            .commentLiked;
      }
    } else {
      likedVideos.push({
        id: selectedItem.id,
        index: selectedItem.index,
        liked: false,
        likedComments: [{commentIndex: commentIndex, commentLiked: true}],
      });
    }

    batch.set(userDocRef, {likedVideos: likedVideos}, {merge: true});

    await batch.commit();
  } catch (error) {
    console.log('Error updating comment like status:', error);
    setTimeout(() => {
      revertCommentLikes(
        currentHorizontalIndex,
        feedIndex,
        commentIndex,
        initialLikes,
        commentLiked,
        allFeedsCollection,
        setAllFeedsCollection,
      );
      Snackbar.show({
        text: 'Failed to update comment like status',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 2000);
  }
};

const updateCommentLikes = (
  horizontalIndex,
  feedIndex,
  commentIndex,
  newLikes,
  commentLiked,
  allFeedsCollection,
  setAllFeedsCollection,
) => {
  const updatedFeedsCollection = [...allFeedsCollection];
  updatedFeedsCollection[horizontalIndex][feedIndex].comments[
    commentIndex
  ].likes = newLikes;
  updatedFeedsCollection[horizontalIndex][feedIndex].comments[
    commentIndex
  ].commentLiked = commentLiked;
  setAllFeedsCollection(updatedFeedsCollection);
};

const revertCommentLikes = (
  horizontalIndex,
  feedIndex,
  commentIndex,
  initialLikes,
  commentLiked,
  allFeedsCollection,
  setAllFeedsCollection,
) => {
  const revertedCommentLikes = [...allFeedsCollection];
  const comment =
    revertedCommentLikes[horizontalIndex][feedIndex].comments[commentIndex];
  comment.likes = initialLikes;
  comment.commentLiked = commentLiked;
  setAllFeedsCollection(revertedCommentLikes);
};

export const handleAddComment = async (
  commentMessage,
  userID,
  selectedItem,
  allFeedsCollection,
  setAllFeedsCollection,
  setComments,
  setCommentMessage,
  internetState,
  videoUrl,
  record,
  currentIndex,
  currentHorizontalIndex,
  feedIndex,
) => {
  console.log(
   "The length is", allFeedsCollection.length,
    feedIndex
  );
  const updatedFeedsCollection = [...allFeedsCollection];
  const selectedFeedArray = updatedFeedsCollection[currentHorizontalIndex];
  // const feedIndex = selectedFeedArray.findIndex(feed => feed.id === selectedItem.id && feed.index === selectedItem.index);
  console.log(feedIndex);

  if (feedIndex !== -1) {
    const newComment = {
      userID,
      reaction: videoUrl ? {video: videoUrl, type: 'video'} : null,
      message: record ? record : commentMessage,
      createdAt: new Date(),
      likes: 0,
      reply: [],
    };

    updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments = [
      ...updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments,
      {
        ...newComment,
        commentIndex: selectedFeedArray[feedIndex].comments.length,
      },
    ];

    setAllFeedsCollection(updatedFeedsCollection);
    setComments(
      updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments,
    );
    setCommentMessage('');
  }

  if (!internetState) {
    updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments =
      updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments.filter(
        comment => comment.createdAt !== comment.createdAt,
      );
    setAllFeedsCollection(updatedFeedsCollection);
    setComments(
      updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments,
    );
    Snackbar.show({
      text: 'Failed to add the comment',
      duration: Snackbar.LENGTH_SHORT,
    });
    return;
  }

  try {
    const feedDocRef = firestore().collection('feeds').doc(selectedItem.id);
    const feedDoc = await feedDocRef.get();
    if (!feedDoc.exists) {
      throw new Error('Feed document does not exist');
    }

    const feedsArray = feedDoc.data().feeds;
    feedsArray[selectedItem.index].comments =
      updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments;
    await feedDocRef.update({feeds: feedsArray});
  } catch (error) {
    console.log('Error adding comment:', error);
    updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments =
      updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments.filter(
        comment => comment.createdAt !== comment.createdAt,
      );
    setAllFeedsCollection(updatedFeedsCollection);
    setComments(
      updatedFeedsCollection[currentHorizontalIndex][feedIndex].comments,
    );
    Snackbar.show({
      text: 'Failed to add comment',
      duration: Snackbar.LENGTH_SHORT,
    });
  }
};
export const handleAddReply = async (
  replyMessage,
  allFeedsCollection,
  selectedItem,
  replyCommentIndex,
  userID,
  setAllFeedsCollection,
  setComments,
  setReplyMessage,
  internetState,
  videoUrl,
  record,
  currentIndex,
  currentHorizontalIndex,
) => {
  const updatedFeedsCollection = [...allFeedsCollection];
  const selectedFeedArray = updatedFeedsCollection[currentHorizontalIndex];
  const feedIndex = selectedFeedArray.findIndex(
    feed => feed.id === selectedItem.id && feed.index === selectedItem.index,
  );
  const commentIndex = selectedFeedArray[feedIndex].comments.findIndex(
    comment => comment.commentIndex === replyCommentIndex,
  );
  if (commentIndex !== -1) {
    const newReply = {
      userID,
      reaction: videoUrl ? {video: videoUrl, type: videoType} : null,
      message: record ? record : replyMessage,
      createdAt: new Date(),
      likes: 0,
    };
    selectedFeedArray[feedIndex].comments[commentIndex].reply = [
      ...selectedFeedArray[feedIndex].comments[commentIndex].reply,
      newReply,
    ];
    setAllFeedsCollection(updatedFeedsCollection);
    setComments(selectedFeedArray[feedIndex].comments);
    setReplyMessage('');
  }
  if (!internetState) {
    selectedFeedArray[feedIndex].comments[commentIndex].reply =
      selectedFeedArray[feedIndex].comments[commentIndex].reply.filter(
        reply => reply.createdAt !== reply.createdAt,
      );
    setAllFeedsCollection(updatedFeedsCollection);
    setComments(selectedFeedArray[feedIndex].comments);
    Snackbar.show({
      text: 'Failed to add the comment',
      duration: Snackbar.LENGTH_SHORT,
    });
    return;
  }

  try {
    const feedDocRef = firestore().collection('feeds').doc(selectedItem.id);
    const feedDoc = await feedDocRef.get();
    if (!feedDoc.exists) {
      throw new Error('Feed document does not exist');
    }

    const feedsArray = feedDoc.data().feeds;
    feedsArray[selectedItem.index].comments[replyCommentIndex].reply =
      selectedFeedArray[feedIndex].comments[commentIndex].reply;
    await feedDocRef.update({feeds: feedsArray});
  } catch (error) {
    console.log('Error adding comment:', error);
    selectedFeedArray[feedIndex].comments[commentIndex].reply =
      selectedFeedArray[feedIndex].comments[commentIndex].reply.filter(
        reply => reply.createdAt !== reply.createdAt,
      );
    setAllFeedsCollection(updatedFeedsCollection);
    setComments(selectedFeedArray[feedIndex].comments);
    Snackbar.show({
      text: 'Failed to add comment',
      duration: Snackbar.LENGTH_SHORT,
    });
  }
};

// update the like of reply
export const handleLikeReply = async (
  reply,
  matchCommentIndex,
  allFeedsCollection,
  selectedItem,
  internetState,
  userID,
  setAllFeedsCollection,
  currentIndex,
  currentHorizontalIndex,
) => {
  const updatedFeedsCollection = [...allFeedsCollection];
  const selectedFeedArray = updatedFeedsCollection[currentHorizontalIndex];
  const feedIndex = selectedFeedArray.findIndex(
    feed => feed.id === selectedItem.id && feed.index === selectedItem.index,
  );
  const commentIndex = selectedFeedArray[feedIndex].comments.findIndex(
    comment => comment.commentIndex === matchCommentIndex,
  );
  const replyIndex = selectedFeedArray[feedIndex].comments[
    commentIndex
  ].reply.findIndex(r => r.createdAt.seconds === reply.createdAt.seconds);
  if (replyIndex === -1) return;
  const initialLikes = reply.likes || 0;
  const newLikes = reply.replyLiked ? initialLikes - 1 : initialLikes + 1;
  const replyLiked = reply.replyLiked;
  updateReplyLikes(
    feedIndex,
    commentIndex,
    replyIndex,
    newLikes,
    !replyLiked,
    allFeedsCollection,
    setAllFeedsCollection,
    currentIndex,
    currentHorizontalIndex,
  );
  if (!internetState) {
    setTimeout(() => {
      revertReplyLikes(
        feedIndex,
        commentIndex,
        replyIndex,
        initialLikes,
        replyLiked,
        allFeedsCollection,
        setAllFeedsCollection,
        currentIndex,
        currentHorizontalIndex,
      );
    }, 2000);
    return;
  }

  try {
    const batch = firestore().batch();
    const feedDocRef = firestore().collection('feeds').doc(selectedItem.id);
    const userDocRef = firestore().collection('users').doc(userID);

    const feedDoc = await feedDocRef.get();
    if (!feedDoc.exists) {
      throw new Error('Document does not exist');
    }
    const feedsArray = feedDoc.data().feeds;
    feedsArray[selectedItem.index].comments[commentIndex].reply[
      replyIndex
    ].likes = newLikes;
    batch.update(feedDocRef, {feeds: feedsArray});

    const userDoc = await userDocRef.get();
    let likedVideos = userDoc.data()?.likedVideos || [];
    if (userDoc.exists) {
      const userData = userDoc.data();
      likedVideos = userData.likedVideos || [];
    }
    const videoIndex = likedVideos.findIndex(
      video =>
        video.id === selectedItem.id && video.index === selectedItem.index,
    );
    if (videoIndex !== -1) {
      const commentIndex = likedVideos[videoIndex].likedComments.findIndex(
        comment => comment.commentIndex === matchCommentIndex,
      );
      if (commentIndex !== -1) {
        if (!likedVideos[videoIndex].likedComments[commentIndex].likedReplies) {
          likedVideos[videoIndex].likedComments[commentIndex].likedReplies = [];
        }
        const likedReplyIndex = likedVideos[videoIndex].likedComments[
          commentIndex
        ].likedReplies.findIndex(
          (likedReply: any) => likedReply.replyIndex === replyIndex,
        );
        if (likedReplyIndex === -1) {
          likedVideos[videoIndex].likedComments[commentIndex].likedReplies.push(
            {replyIndex: replyIndex, replyLiked: true},
          );
        } else {
          likedVideos[videoIndex].likedComments[commentIndex].likedReplies[
            likedReplyIndex
          ].replyLiked =
            !likedVideos[videoIndex].likedComments[commentIndex].likedReplies[
              likedReplyIndex
            ].replyLiked;
        }
      } else {
        likedVideos.push({
          likedComments: [
            {
              commentIndex: commentIndex,
              commentLiked: false,
              likedReplies: [{replyIndex: replyIndex, replyLiked: true}],
            },
          ],
        });
      }
    } else {
      likedVideos.push({
        id: selectedItem.id,
        index: selectedItem.index,
        liked: false,
        likedComments: [
          {
            commentIndex: commentIndex,
            commentLiked: false,
            likedReplies: [{replyIndex: replyIndex, replyLiked: true}],
          },
        ],
      });
    }
    batch.set(userDocRef, {likedVideos: likedVideos}, {merge: true});
    await batch.commit();
  } catch (error) {
    console.log('Error updating comment like status:', error);
    setTimeout(() => {
      revertReplyLikes(
        feedIndex,
        commentIndex,
        replyIndex,
        initialLikes,
        replyLiked,
        allFeedsCollection,
        setAllFeedsCollection,
      );
      Snackbar.show({
        text: 'Failed to update comment like status',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 2000);
  }
};

const updateReplyLikes = (
  feedIndex,
  commentIndex,
  replyIndex,
  newLikes,
  replyLiked,
  allFeedsCollection,
  setAllFeedsCollection,
  currentIndex,
  currentHorizontalIndex,
) => {
  const updatedReplyLikes = [...allFeedsCollection];
  const reply =
    updatedReplyLikes[currentHorizontalIndex][feedIndex].comments[commentIndex]
      .reply[replyIndex];
  reply.likes = newLikes;
  reply.replyLiked = replyLiked;
  setAllFeedsCollection(updatedReplyLikes);
};

const revertReplyLikes = (
  feedIndex,
  commentIndex,
  replyIndex,
  initialLikes,
  replyLiked,
  allFeedsCollection,
  setAllFeedsCollection,
  currentIndex,
  currentHorizontalIndex,
) => {
  const updatedRevertedLikes = [...allFeedsCollection];
  const reply =
    updatedRevertedLikes[currentHorizontalIndex][feedIndex].comments[
      commentIndex
    ].reply[replyIndex];
  reply.likes = initialLikes;
  reply.replyLiked = replyLiked;
  setAllFeedsCollection(updatedRevertedLikes);
};

// Views count
export const updateViewStatusAndCount = async (
  userID,
  selectedItem,
  horizontalIndex,
) => {
  try {
    const userDocRef = firestore().collection('users').doc(userID);
    const feedDocRef = firestore().collection('feeds').doc(selectedItem.id);
    const batch = firestore().batch();
    const userDoc = await userDocRef.get();
    const feedDoc = await feedDocRef.get();

    if (!feedDoc.exists) {
      throw new Error('Feed document does not exist');
    }

    let viewedVideos = userDoc.data()?.viewedVideos || [];
    const videoExists = viewedVideos.some(
      video =>
        video.id === selectedItem.id && video.index === selectedItem.index,
    );
    if (!videoExists) {
      viewedVideos.push({
        id: selectedItem.id,
        index: selectedItem.index,
      });
      batch.set(userDocRef, {viewedVideos: viewedVideos}, {merge: true});
    }
    const feedsArray = feedDoc.data().feeds;
    feedsArray[selectedItem.index].views =
      (feedsArray[selectedItem.index].views || 0) + 1;
    batch.update(feedDocRef, {feeds: feedsArray});
    await batch.commit();
  } catch (error) {
    console.error('Error updating view status and count:', error);
  }
};
