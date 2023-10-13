import React from "react";
import withRouter from "../../withRouter";
import BaseListPage from "../../base/BaseListPage";
import ChatUserPresenter from "./ChatUserPresenter";
import { findObjectUseCase } from "../../usecases/object";
import {
  Button,
  InputFactory,
  Progress,
  InfiniteScroll as Scroll,
} from "nq-component";
import Queue from "nq";
import Avatar from "../../assets/img/avatar.png";
import Search from "../../components/Search";
import Profile from "../../assets/img/profile_icon.jpg";
import SearchResult from "../../components/SearchResult";

class ChatUserPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new ChatUserPresenter(this, findObjectUseCase());
    this.state = {
      users: [],
      count: 0,
      message: [],
      messages: [],
      chat: null,
    };
  }

  getCollectionName() {
    return "users";
  }

  onChangeSearch(value) {
    this.presenter.onSubmitSearch(value);
  }

  setUsers(users) {
    this.setState({ users });
  }

  onClickUser(user) {
    console.log("receiver", user);
    this.presenter.onClickUser(user);
  }

  loadMore() {
    this.presenter.loadMore();
  }

  setCount(count) {
    return this.setState({ count });
  }

  onChange(value, field) {
    this.presenter.onChange(value, field);
  }

  setMessage(message) {
    this.setState({ message });
  }

  onSubmitMessage(e) {
    e.preventDefault();
    this.presenter.onSubmitMessage();
  }

  onCreate(message) {
    const messages = this.getMessages();
    messages.push(message);
    this.setMessages(messages);
  }

  render() {
    const users = this.state.users;
    const message = this.state.message;
    const messages = this.state.messages;
    const count = this.state.count;
    const progress = this.state.progress;
    const sender = this.getCurrentUser();
    console.log("users", users);
    console.log(sender, "sender");
    return (
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
            <a className="navbar-brand me-auto">New Message</a>
          </div>
        </nav>

        <div className="container">
          <div className="py-3 px-lg-5 py-lg-4">
            <div className="shadow-sm rounded bg-white">
              <div className="p-3 px-lg-5 py-lg-4">
                <div className="input-group align-items-center">
                  <div className="fs-5 me-3">
                    <span>To :</span>
                  </div>
                  <Search
                    onChange={this.onChangeSearch.bind(this)}
                    name="search"
                    autoFocus
                    className="form-control m-0"
                    placeholder="Search User.."
                  />
                </div>
                <div className="mb-4">
                  <div
                    className="ms-5 cursor-pointer"
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0px 0px 8px #ddd",
                      borderRadius: "0 0 8px 8px",
                      borderBottom: "1px solid gray",
                      borderRight: "1px solid gray",
                      borderLeft: "1px solid gray",
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    {users.map((user) => {
                      if (user.id === sender.id) return null;
                      return (
                        <SearchResult
                          key={user.id}
                          user={user}
                          onClickUser={this.onClickUser.bind(this, user)}
                        />
                      );
                    })}
                    {/* {progress && (
                      <Progress className="fs-sm">Loading...</Progress>
                    )}
                    {!progress && count === 0 && <h3>No Data Found</h3>} */}
                  </div>
                </div>
                <form className="row align-items-center gx-1" onSubmit={this.onSubmitMessage.bind(this)}>
                  <div className="col-auto">
                    <button
                      // onClick={this.onClickAttachment.bind(this)}
                      type="button"
                      className="btn btn-link"
                    >
                      <i className="bi bi-paperclip fs-5"></i>
                    </button>
                  </div>
                  <div className="col">
                    <InputFactory
                      type="Text"
                      field="content"
                      object={message}
                      placeholder="Enter your Message Here."
                      className="form-control form-control-lg"
                      onChange={(value) => this.onChange(value, "content")}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button className="btn btn-primary mt-3" type="submit">
                      Send <i className="bi bi-send"></i>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ChatUserPage);
