import React from "react";
import withRouter from "../../withRouter";
import BaseListPage from "../../base/BaseListPage";
import ChatUserPresenter from "./ChatUserPresenter";
import { findObjectUseCase } from "../../usecases/object";
import { Button, Progress, InfiniteScroll as Scroll } from "nq-component";
import Queue from "nq";
import Avatar from "../../assets/img/avatar.png";
import Search from "../../components/Search";

class ChatUserPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new ChatUserPresenter(this, findObjectUseCase());
    this.state = {
      users: [],
      count: 0,
    };
    // this.onChangeSearch = this.onChangeSearch.bind(this);
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

  render() {
    const users = this.state.users;
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
            <a className="navbar-brand me-auto">
              New Message
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="py-3 px-lg-5 py-lg-4">
            <div className="shadow-sm rounded bg-white">
              <div className="p-3 px-lg-5 py-lg-4">
                <div className="input-group mb-3">
                  <Search
                    onChange={this.onChangeSearch.bind(this)}
                    name="search"
                    autoFocus
                    className="form-control"
                    placeholder="Search User.."
                  />
                  <Button className="btn btn-primary">
                    <i className="bi bi-search text-white"></i>
                  </Button>
                </div>
                <Scroll
                  hasMore={users.length < count}
                  loadMore={this.loadMore.bind(this)}
                >
                  {users.map((user) => {
                    if (user.id === sender.id) return null;
                    return (
                      <div
                        key={user.id}
                        className="p-3 cursor-pointer"
                        onClick={this.onClickUser.bind(this, user)}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            className="rounded-circle me-2"
                            src={
                              (user.profile &&
                                Queue.File.getFile(user.profile)) ||
                              Avatar
                            }
                            width="40"
                            height="40"
                            alt=""
                          />
                          <h6 className="mb-0">{user.name || user.username}</h6>
                        </div>
                      </div>
                    );
                  })}
                  {/* {progress && (
                    <Progress className="fs-sm">Loading ...</Progress>
                  )}
                  {!progress && count === 0 && <h3>No Data Found</h3>} */}
                </Scroll>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ChatUserPage);
