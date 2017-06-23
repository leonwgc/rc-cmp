import React, { Component } from 'react';
import classNames from 'classnames';
import './Pager.scss';

export default class Pager extends Component {
  state = {
    pageCount: this.props.pageCount,
    page: 1,
    pageNumbers: []
  };

  getPageNumbers(pageCount) {
    var page = this.state.page;
    var pageCount = this.state.pageCount;
    var visiblePageCount = this.props.visiblePageCount || 10;
    var low, high, v;
    var pageNumbers = [];

    if (pageCount === 0) {
      return;
    }
    if (page > pageCount) {
      page = 1;
    }

    if (pageCount <= visiblePageCount) {
      low = 1;
      high = pageCount;
    } else {
      v = Math.ceil(visiblePageCount / 2);
      low = Math.max(page - v, 1);
      high = Math.min(low + visiblePageCount - 1, pageCount);

      if (pageCount - high < v) {
        low = high - visiblePageCount + 1;
      }
    }

    for (; low <= high; low++) {
      pageNumbers.push(low);
    }

    return pageNumbers;
  }

  pageChange = () => {
    this.refresh();
    this.props.onPageChange(this.state.page);
  };

  pageClick = e => {
    this.setState({ page: Number(e.target.innerText) }, this.pageChange);
  };

  prev = e => {
    this.setState(prev => {
      if (prev.page > 1) {
        return { page: --prev.page };
      }
    }, this.pageChange);
  };

  next = e => {
    this.setState(prev => {
      if (prev.page < prev.pageCount) {
        return { page: ++prev.page };
      }
    }, this.pageChange);
  };

  refresh() {
    this.setState({
      pageNumbers: this.getPageNumbers()
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.pageCount !== nextProps.pageCount) {
      this.setState(
        {
          pageCount: nextProps.pageCount
        },
        this.refresh
      );
    }
  }

  render() {
    return (
      <div className="pager">
        <ul className={classNames({ 'x-hide': this.props.pageCount < 2 })}>
          <li onClick={this.prev} className={classNames({ disable: this.state.page === 1 })}>
            &lt;
          </li>
          {this.state.pageNumbers.map(item =>
            <li key={item} onClick={this.pageClick} className={classNames({ active: this.state.page === item })}>
              {item}
            </li>
          )}
          <li
            onClick={this.next}
            className={classNames({
              disable: this.state.page === this.props.pageCount
            })}>
            &gt;
          </li>
        </ul>
      </div>
    );
  }
}
