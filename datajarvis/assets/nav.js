/**
 * WinBetix Analytics — Shared Sidebar Navigation
 *
 * Included by every report page. Injects <aside class="sidebar"> and a
 * floating expand button. Groups are collapsible accordions; the sidebar
 * itself can be fully collapsed via the header button.
 *
 * To add/rename/reorder items, edit this file only.
 * Logo: assets/logo.png
 */
(function () {

  /* ── Navigation structure ─────────────────────────────── */
  var nav = [
    {
      type: 'link',
      href: 'dashboard.html',
      file: 'dashboard.html',
      label: 'Dashboard',
      icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/></svg>'
    },
    {
      type: 'group',
      id: 'general',
      label: 'General Reports',
      icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M2 3h12M2 6.5h12M2 10h8M2 13.5h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
      links: [
        {
          href: 'daily-report.html',
          file: 'daily-report.html',
          label: 'Daily Performance KPI',
          icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M2 12l3-4 2.5 2.5 3-5 3 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 14h14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>'
        },
        {
          href: 'payment-report.html',
          file: 'payment-report.html',
          label: 'Payment Performance KPI',
          icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M1 7h14" stroke="currentColor" stroke-width="1.5"/><circle cx="4.5" cy="10.5" r="1" fill="currentColor"/></svg>'
        },
        {
          href: 'inout-report.html',
          file: 'inout-report.html',
          label: 'In / Out',
          icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M4 6l4-4 4 4M4 10l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        }
      ]
    },
    {
      type: 'group',
      id: 'crm',
      label: 'CRM',
      icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M1 14c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M11.5 7a2.5 2.5 0 010 5M13 8.5c1 .5 2 1.5 2 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
      links: [
        {
          href: 'churn-report.html',
          file: 'churn-report.html',
          label: 'Churn Rate',
          icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M2 12L5 7l3 3 2.5-4 3 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        }
      ]
    },
    {
      type: 'link',
      href: '../docs/roadmap.html',
      file: 'roadmap.html',
      label: 'Roadmap',
      icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><path d="M2 4h3l2 3-2 3H2V4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M5 7h9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M11 4l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    {
      type: 'group',
      id: 'affiliate',
      label: 'Affiliate',
      icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="2.5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="13.5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 4.8L4 10.2M9 4.8l3 5.4M5 12h6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
      links: [
        {
          href: 'affiliate-report.html',
          file: 'affiliate-report.html',
          label: 'Affiliate Performance KPI',
          icon: '<svg class="icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="4" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="3" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><circle cx="13" cy="12" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M8 6v2M6 10L4.5 10.5M10 10l1.5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
        }
      ]
    }
  ];

  /* ── Detect current page ──────────────────────────────── */
  var currentFile = window.location.pathname.split('/').pop() || '';

  /* ── Build nav HTML ───────────────────────────────────── */
  var navHTML = '';
  nav.forEach(function (item) {
    if (item.type === 'link') {
      var isActive = item.file === currentFile;
      navHTML +=
        '<a class="nav-item' + (isActive ? ' active' : '') + '" href="' + item.href + '">' +
          item.icon + item.label +
        '</a>';
    } else {
      var hasActive = item.links.some(function (l) { return l.file === currentFile; });
      navHTML +=
        '<div class="nav-group' + (hasActive ? ' open' : '') + '" data-id="' + item.id + '">' +
          '<div class="nav-group-hd">' +
            item.icon +
            '<span class="nav-group-label">' + item.label + '</span>' +
            '<svg class="nav-chevron" viewBox="0 0 16 16" fill="none">' +
              '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
          '</div>' +
          '<div class="nav-group-items"><div class="nav-group-inner">';
      item.links.forEach(function (link) {
        var isActive = link.file === currentFile;
        navHTML +=
          '<a class="nav-item nav-child' + (isActive ? ' active' : '') + '" href="' + link.href + '">' +
            link.icon + link.label +
          '</a>';
      });
      navHTML += '</div></div></div>';
    }
  });

  /* ── Full sidebar HTML ────────────────────────────────── */
  var sidebarHTML =
    '<aside class="sidebar">' +
      '<div class="logo">' +
        '<img class="logo-img" src="../assets/logo.png" alt="WinBetix">' +
        '<button class="sidebar-collapse-btn" title="Collapse sidebar">' +
          '<svg viewBox="0 0 16 16" fill="none"><path d="M10 3L6 8l4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>' +
      '</div>' +
      '<nav class="nav">' + navHTML + '</nav>' +
      '<div class="sidebar-bottom">' +
        '<div class="user-pill">' +
          '<div class="avatar">AK</div>' +
          '<div class="user-info">' +
            '<div class="user-name">Anna K.</div>' +
            '<div class="user-role">Super Admin</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</aside>' +
    '<button class="sidebar-expand-btn" title="Expand sidebar">' +
      '<svg viewBox="0 0 16 16" fill="none"><path d="M6 3l4 5-4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</button>';

  /* ── State persistence ────────────────────────────────── */
  var LS_KEY = 'wb_nav_state';

  function saveState() {
    var state = {
      collapsed: document.querySelector('.sidebar').classList.contains('collapsed'),
      groups: {}
    };
    document.querySelectorAll('.nav-group').forEach(function (g) {
      state.groups[g.dataset.id] = g.classList.contains('open');
    });
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function loadState() {
    var raw;
    try { raw = localStorage.getItem(LS_KEY); } catch (e) {}
    if (!raw) return;
    var state;
    try { state = JSON.parse(raw); } catch (e) { return; }

    if (state.collapsed) {
      document.querySelector('.sidebar').classList.add('collapsed');
      document.querySelector('.sidebar-expand-btn').classList.add('visible');
    }
    if (state.groups) {
      document.querySelectorAll('.nav-group').forEach(function (g) {
        /* Groups containing the active page stay open regardless of saved state */
        if (g.classList.contains('open')) return;
        if (state.groups[g.dataset.id] === true) g.classList.add('open');
      });
    }
  }

  /* ── Inject & wire events ─────────────────────────────── */
  function inject() {
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    /* Group accordion */
    document.querySelectorAll('.nav-group-hd').forEach(function (hd) {
      hd.addEventListener('click', function () {
        hd.parentElement.classList.toggle('open');
        saveState();
      });
    });

    /* Collapse sidebar */
    document.querySelector('.sidebar-collapse-btn').addEventListener('click', function () {
      document.querySelector('.sidebar').classList.add('collapsed');
      document.querySelector('.sidebar-expand-btn').classList.add('visible');
      saveState();
    });

    /* Expand sidebar */
    document.querySelector('.sidebar-expand-btn').addEventListener('click', function () {
      document.querySelector('.sidebar').classList.remove('collapsed');
      document.querySelector('.sidebar-expand-btn').classList.remove('visible');
      saveState();
    });

    loadState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
