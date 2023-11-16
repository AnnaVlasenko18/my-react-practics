import React, { Component } from 'react';
import { Topic, Wrapper, MetaWrapper, Text, Button } from './QuizCard.styled';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export class QuizCard extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const {
      quiz: { id, topic, level, time, questions },
      onDelete,
    } = this.props;

    return (
      <Wrapper level={level}>
        <Topic>{topic}</Topic>
        <MetaWrapper>
          <Text>
            <b>Level:</b> {level}
          </Text>
          <Text>
            <b>Time:</b> {time}
          </Text>
          <Text>
            <b>Questions:</b> {questions}
          </Text>
        </MetaWrapper>
        <Button onClick={() => onDelete(id)}>Delete</Button>
        <button onClick={this.openModal}>Open modal</button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <p>I'm a modal window {topic}</p>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
      </Wrapper>
    );
  }
}
