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
import { InfiniteScroll as Scroll, Progress } from "nq-component";
import BaseListPage from "../../base/BaseListPage";
import ellipsize from "../../ellipsize";
import NotFoundPage from "../notfound";
import Queue from "nq";
import { Avatar } from "antd";
import getDateAndTimeFromISO from "../../getDateAndTimeFromISO";

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
                <Scroll
                  hasMore={chats.length < count}
                  loadMore={this.loadMore.bind(this)}
                >
                  {chats.map((chat) => {
                    const receiver = chat?.participants.find(
                      (u) => u.id !== sender.id
                    );
                    return (
                      <div
                        key={chat?.id}
                        className="cursor-pointer mb-3"
                        onClick={this.onClickChat.bind(this, chat)}
                      >
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              className="rounded-circle me-2"
                              src={
                                (receiver?.profile &&
                                  Queue.File.getFile(receiver.profile)) ||
                                Avatar
                              }
                              width="40"
                              height="40"
                              alt=""
                            />
                          </div>
                          <div className="w-100">
                            <div className="d-flex justify-content-between">
                              <h6 className="mb-0">
                                {receiver?.name || receiver?.username}
                              </h6>
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ChatPage);
