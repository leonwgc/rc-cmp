import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Pager.scss';

export default class Pager extends Component {
  state = {
    pageCount: this.props.pageCount,
    page: this.props.currentPage || 1,
    pageNumbers: []
  };

  getPageNumbers() {
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
    this.renderPageNumbers();
    this.props.onPageChange(this.state.page);
  };

  pageClick = e => {
    this.setState({ page: Number(e.target.innerText) }, this.pageChange);
  };

  prev = () => {
    this.setState(prev => {
      if (prev.page > 1) {
        return { page: --prev.page };
      }
    }, this.pageChange);
  };

  gotoPage = page => () => {
    this.setState({ page: page }, this.pageChange);
  };

  next = () => {
    this.setState(prev => {
      if (prev.page < prev.pageCount) {
        return { page: ++prev.page };
      }
    }, this.pageChange);
  };

  renderPageNumbers() {
    this.setState({
      pageNumbers: this.getPageNumbers()
    });
  }

  componentDidMount() {
    this.renderPageNumbers();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.pageCount !== nextProps.pageCount) {
      this.setState(
        {
          pageCount: nextProps.pageCount
        },
        this.renderPageNumbers
      );
    }
  }

  render() {
    return (
      <div className={'rc-pager ' + (this.props.cls ? this.props.cls : '')}>
        <ul className={classNames({ 'x-hide': this.props.pageCount < 2 })}>
          {this.props.showFirstLastPage
            ? <li
                onClick={this.gotoPage(1)}
                className={classNames({ disable: this.state.page === 1 })}>
                {this.props.firstPage}
              </li>
            : null}
          <li
            onClick={this.prev}
            className={classNames({ disable: this.state.page === 1 })}>
            {this.props.prevPage}
          </li>
          {this.state.pageNumbers.map(item =>
            <PageNumber
              key={item}
              number={item}
              onClick={this.pageClick}
              active={this.state.page === item}
            />
          )}
          <li
            onClick={this.next}
            className={classNames({
              disable: this.state.page === this.props.pageCount
            })}>
            {this.props.nextPage}
          </li>
          {this.props.showFirstLastPage
            ? <li
                onClick={this.gotoPage(this.props.pageCount)}
                className={classNames({
                  disable: this.state.page === this.props.pageCount
                })}>
                {this.props.lastPage}
              </li>
            : null}
        </ul>
      </div>
    );
  }
}

function PageNumber({ number, onClick, active }) {
  return (
    <li onClick={onClick} className={classNames({ active: active })}>
      {number}
    </li>
  );
}

Pager.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  visiblePageCount: PropTypes.number,
  prevPage: PropTypes.string,
  nextPage: PropTypes.string,
  firstPage: PropTypes.string,
  lastPage: PropTypes.string,
  showFirstLastPage: PropTypes.bool,
  cls: PropTypes.string
};

Pager.defaultProps = {
  prevPage: '上一页',
  nextPage: '下一页',
  firstPage: '首页',
  lastPage: '尾页',
  showFirstLastPage: false
};
