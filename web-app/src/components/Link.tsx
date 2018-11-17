import React from 'react';

interface ILinkProps {
  children: React.ReactNode;
  title: string;
}

export class Link extends React.Component<
  ILinkProps & React.HTMLProps<HTMLAnchorElement>
> {
  public render() {
    const { children, ...rest } = this.props;
    return (
      <a {...rest} onClick={this.handleOnClick}>
        {children}
      </a>
    );
  }

  private handleOnClick = (event: React.SyntheticEvent) => {
    const { href, title } = this.props;
    event.preventDefault();
    window.history.pushState(null, title, href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
}
