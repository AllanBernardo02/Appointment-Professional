import React, { createRef } from "react";
import withRouter from "../../withRouter";
import BasePage from "../../base/BasePage";
import ChatMessagePresenter from "./ChatMessagePresenter";
import {
  findObjectUseCase,
  saveObjectUseCase,
  updateObjectUseCase,
} from "../../usecases/object";
import { saveFileUseCase } from "../../usecases/file";
import { InputFactory, InputString, Progress } from "nq-component";
import dateFormat from "../../dateFormat";
import Content from "./Content";
import browseFile from "../../browseFile";
import { Avatar } from "antd";
import Queue from "nq";

class ChatMessagePage extends BasePage {
  constructor(props) {
    super(props);
    this.presenter = new ChatMessagePresenter(
      this,
      findObjectUseCase(),
      saveObjectUseCase(),
      updateObjectUseCase(),
      saveFileUseCase()
    );
    this.state = {
      messages: [],
      message: {},
      chat: null,
      progress: false,
    };
    this.overflow = createRef();
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount();
  }

  onCreate(message) {
    const messages = this.getMessages();
    messages.push(message);
    this.setMessages(messages);
  }

  getChatId() {
    const params = this.getParams();
    return params.id;
  }

  setMessages(messages) {
    this.setState({ messages }, this.scrollDown);
  }

  getMessages() {
    return this.state.messages;
  }

  setChat(chat) {
    this.setState({ chat });
  }

  getChat() {
    // get chat state or get chat from props navigation
    console.log("chat", this.state.chat);
    return this.state.chat || this.getArgument();
  }

  setMessage(message) {
    this.setState({ message });
  }

  getMessage() {
    return this.state.message;
  }

  onSubmitMessage(e) {
    e.preventDefault();
    this.presenter.onSubmitMessage();
  }

  onClickAttachment() {
    browseFile("*").then((files) => {
      this.presenter.onClickAttachment(files[0]);
    });
  }

  scrollDown() {
    const element = this.overflow.current;
    element.scroll({ top: element.scrollHeight, behavior: "smooth" });
  }

  onClickBack() {
    this.presenter.onClickBack();
  }

  onClickClose() {
    this.presenter.closeClick();
  }

  onChange(value, field) {
    this.presenter.onChange(value, field);
  }

  render() {
    const chat = this.state.chat;
    const progress = this.state.progress;
    if (!chat) return <div>Loading chat...</div>;
    const sender = this.getCurrentUser();
    const receiver =
      chat.participants.find((u) => u.id !== sender.id) || sender;
    const messages = this.state.messages;
    const message = this.state.message;
    const showClose = chat.type === "SUPPORT" && chat.user.id !== sender.id;
    // console.log(chat);
    // console.log("message", messages);
    console.log(messages, "message");
    console.log("sender", sender);
    return (
      <>
        <>
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
              <button
                onClick={this.navigateBack.bind(this)}
                type="button"
                className="btn btn-sm btn-link fs-4 ps-0 text-dark"
              >
                <i className="bi bi-arrow-left-short"></i>
              </button>
              <div className="d-flex me-auto">
                <div>
                  <img
                    className="rounded-circle me-2"
                    src={
                      (receiver.profile &&
                        Queue.File.getFile(receiver.profile)) ||
                      Avatar
                    }
                    width="40"
                    height="40"
                    alt=""
                  />
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0">
                      {receiver.name || receiver.username}
                    </h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="fs-xs mb-0">Active now</p>
                  </div>
                </div>
              </div>
              {showClose && (
                <div className="dropdown dropstart">
                  <button
                    className="btn btn-sm btn-link fs-4 ps-0 text-dark"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={this.onClickClose.bind(this)}
                      >
                        Close
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>

          <div ref={this.overflow} className="overflow-auto">
            <div className="container">
              <div className="py-3 px-lg-5 py-lg-4">
                <div className="d-flex flex-column justify-content-end">
                  {messages.map((message) => {
                    return (
                      <Content
                        key={message.id}
                        user={sender}
                        message={message}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* {messages.map((message) => {
                    return (
                      <Content
                      key={message.id}
                      user={sender}
                      message={message}
                      />
                    );
                  })} */}
          <div className="mt-auto p-2 bg-light">
            <form
              className="row align-items-center gx-2"
              onSubmit={this.onSubmitMessage.bind(this)}
            >
              <div className="col-auto">
                <button
                  onClick={this.onClickAttachment.bind(this)}
                  type="button"
                  className="btn btn-link"
                >
                  <i className="bi bi-paperclip"></i>
                </button>
              </div>
              <div className="col">
                <InputFactory
                  required
                  field="content"
                  object={message}
                  type="String"
                  className="form-control form-control-lg"
                  placeholder="Enter your Message here"
                  onChange={(value) => this.onChange(value, "content")}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary fs-sm">SEND</button>
              </div>
            </form>
          </div>
        </>
      </>
    );
  }
}

export default withRouter(ChatMessagePage);
