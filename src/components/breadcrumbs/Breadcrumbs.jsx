import React from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import './Breadcrumbs.scss';

const Breadcrumbs = ({ classNames, linkCl, lastCrumbVal }) => {
  const routes = [
    { path: '/', breadcrumb: 'Главная' },
    { path: 'clients', breadcrumb: 'Пациенты' },
    { path: 'news', breadcrumb: 'Новости' },
    { path: 'news/:slug', breadcrumb: lastCrumbVal },
  ];
  const crumbs = useBreadcrumbs(routes);

  return (
    <section className={`crumbs ${classNames}`}>
      <div className="container">
        <div className="crumbs__inner">
          <ul className="crumbs__list">
            {crumbs.map((crumb) => (
              <li className="crumbs__list-item" key={crumb.match.pathname}>
                <Link
                  className={`${linkCl} crumbs__list-link link link-accent`}
                  to={crumb.match.pathname}
                >
                  {crumb.breadcrumb}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumbs;
