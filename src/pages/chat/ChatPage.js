import React from "react";
import withRouter from "../../withRouter";
import BasePage from "../../base/BasePage";
import ChatPresenter from "./ChatPresenter";
import {
  findObjectUseCase,
  saveObjectUseCase,
  updateObjectUseCase,
} from "../../usecases/object";
import NavBar from "../../components/navbar";
import { InfiniteScroll as Scroll, Progress, Button } from "nq-component";
import BaseListPage from "../../base/BaseListPage";
import ellipsize from "../../ellipsize";
import NotFoundPage from "../notfound";
import Queue from "nq";
import profile from "../../assets/img/profile_icon.jpg";
import { Avatar } from "antd";
import getDateAndTimeFromISO from "../../getDateAndTimeFromISO";
import { Link } from "react-router-dom";
import Card from "../../components/Card";

class ChatPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new ChatPresenter(
      this,
      findObjectUseCase(),
      saveObjectUseCase(),
      updateObjectUseCase()
    );
    this.state = {
      chats: [],
      messages: [],
      progress: false,
      count: 0,
    };
  }

  getCollectionName() {
    return "chats";
  }

  componentDidMount() {
    this.presenter.componentDidMount();
  }

  componentWillUnmount() {
    this.presenter.componentWillUnmount();
  }

  onSelectUser(user) {
    this.presenter.onSelectUser(user);
  }

  setChats(chats) {
    this.setState({ chats });
  }

  onClickChat(chat) {
    this.presenter.onClickChat(chat);
  }

  onFocusSearch() {
    this.presenter.onFocusSearch();
  }

  loadMore() {
    this.presenter.loadMore();
  }

  setCount(count) {
    return this.setState({ count });
  }

  setMessages(messages) {
    this.setState({ messages });
  }

  onCreateNewMessage() {
    this.presenter.onCreateNewMessage();
  }

  render() {
    const count = this.state.count;
    const progress = this.state.progress;
    const sender = this.getCurrentUser();
    const chats = this.state.chats;
    const message = this.state.messages;

    console.log("Get Message", message);

    console.log("chats", chats);
    return (
      <>
        <NavBar className="shadow-sm" />
        <div className="container h-100">
          <div className="py-3 px-lg-5 py-lg-4 h-100">
            <div className="shadow-sm rounded bg-white h-100">
              <div className="p-3 px-lg-5 py-lg-4">
                <div className="input-group mb-3">
                  <input
                    onFocus={this.onFocusSearch.bind(this)}
                    className="form-control"
                    placeholder="Search User.."
                  />
                  <button className="btn btn-primary">
                    <i className="bi bi-search text-white"></i>
                  </button>
                </div>
                <div className="mb-4 fs-4 text-center fw-bold">
                  <span>Recent Chats</span>
                </div>
                <Scroll
                  hasMore={chats.length < count}
                  loadMore={this.loadMore.bind(this)}
                >
                  {chats.map((chat) => {
                    const receiver = chat?.participants.find(
                      (u) => u.id !== sender.id
                    );
                    const participants = chat?.participants.filter(
                      (participant) => participant.id !== sender.id
                    );
                    console.log("this is the participants", participants);
                    return (
                      <div
                        key={chat?.id}
                        className="cursor-pointer mb-3"
                        onClick={this.onClickChat.bind(this, chat)}
                      >
                        <div className="d-flex align-items-center">
                          <div>
                            {participants.map((participant) => (
                              <img
                                className="rounded-circle me-2"
                                src={
                                  (participant?.profile &&
                                    Queue.File.getFile(participant.profile)) ||
                                  profile
                                }
                                width="40"
                                height="40"
                                alt=""
                              />
                            ))}
                          </div>
                          <div className="w-100">
                            <div className="d-flex justify-content-between">
                              {participants.map((participant) => (
                                <span key={participant.id}>
                                  {participant.name || participant.username}
                                </span>
                              ))}
                              {/* <span className="text-muted fs-xs ms-2">
                                {getDateAndTimeFromISO(chat?.updatedAt)}
                              </span> */}
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="me-2 text-truncate overflow-hidden">
                                {chat?.seen === false &&
                                chat?.initiator?.id !== sender?.id ? (
                                  <b>
                                    <p className="text-truncate fs-sm ">
                                      {chat?.content &&
                                        ellipsize(chat.content, 15)}
                                    </p>
                                  </b>
                                ) : (
                                  <p className="text-truncate fs-sm ">
                                    {chat?.content &&
                                      ellipsize(chat.content, 15)}
                                  </p>
                                )}
                              </div>
                              <i
                                className={
                                  chat?.seen === false &&
                                  chat?.initiator?.id !== sender?.id
                                    ? "bi bi-circle-fill"
                                    : ""
                                }
                                style={{ color: "#79bb48" }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {progress && (
                    <Progress className="fs-sm">Loading ...</Progress>
                  )}
                  {!progress && chats.length === 0 && (
                    <NotFoundPage message="No messages found" />
                  )}
                </Scroll>
                <div className="position-fixed bottom-0 end-0 m-4">
                  <Button
                    className="btn btn-primary shadow-sm bg-primary"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "25px",
                    }}
                    onClick={this.onCreateNewMessage.bind(this)}
                  >
                    <i className="bi bi-pencil-square fs-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ChatPage);
