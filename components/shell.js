(function() {
  var NAV = [
    { href: 'index.html', icon: '\u{1F4CA}', label: '\u0414\u0430\u0448\u0431\u043E\u0440\u0434' },
    { href: 'orders.html', icon: '\u{1F4E6}', label: '\u0417\u0430\u043A\u0430\u0437\u044B' },
    { href: 'claims.html', icon: '\u26A0\uFE0F', label: '\u0420\u0435\u043A\u043B\u0430\u043C\u0430\u0446\u0438\u0438', badgeKey: 'activeClaims' },
    { href: 'docs.html', icon: '\u{1F4C4}', label: '\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B', badgeKey: 'pendingDocs' },
    { href: 'products.html', icon: '\u{1F527}', label: '\u041A\u0430\u0442\u0430\u043B\u043E\u0433' },
    { href: 'rating.html', icon: '\u{1F3C6}', label: '\u0420\u0435\u0439\u0442\u0438\u043D\u0433' }
  ];

  function getActivePage() {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return page;
  }

  function buildShell(dealer) {
    var activePage = getActivePage();
    var notifCount = dealer.notifications ? dealer.notifications.length : 0;
    var pendingDocs = 2;

    // Add body offset for fixed sidebar + header (don't move DOM nodes)
    document.body.style.paddingLeft = '240px';
    document.body.style.paddingTop = '56px';

    // Sidebar (position: fixed — doesn't affect layout)
    var sidebar = document.createElement('aside');
    sidebar.id = 'shell-sidebar';
    sidebar.style.cssText = 'width:240px;height:100vh;background:#0b1120;border-right:1px solid #1e293b;padding:0;position:fixed;top:0;left:0;z-index:40;display:flex;flex-direction:column;overflow-y:auto;';

    var logoHtml = '<div style="padding:20px 20px 16px;border-bottom:1px solid #1e293b">'
      + '<div style="color:#5dcaa5;font-weight:700;font-size:18px;letter-spacing:3px">\u0422\u0420\u0415\u041A</div>'
      + '<div style="font-size:11px;color:#475569;margin-top:2px">\u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u0434\u0438\u043B\u0435\u0440\u0430</div>'
      + '</div>';

    var dealerHtml = '<div style="padding:16px 20px;border-bottom:1px solid #1e293b">'
      + '<div style="font-size:13px;color:#e2e8f0;font-weight:600">' + dealer.name + '</div>'
      + '<div style="font-size:11px;color:#5dcaa5;margin-top:2px">' + dealer.typeLabel + ' \u00B7 ' + dealer.levelIcon + ' ' + dealer.levelLabel + '</div>'
      + '<div style="font-size:10px;color:#64748b;margin-top:4px">' + dealer.points.toLocaleString('ru-RU') + ' \u0431\u0430\u043B\u043B\u043E\u0432 \u00B7 #' + dealer.rank + ' \u0432 \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0435</div>'
      + '</div>';

    var navHtml = '<nav style="padding:12px 10px;flex:1">';
    for (var i = 0; i < NAV.length; i++) {
      var item = NAV[i];
      var isActive = activePage === item.href || (activePage === '' && item.href === 'index.html');
      var badge = '';
      if (item.badgeKey === 'activeClaims' && dealer.activeClaims > 0) {
        badge = '<span style="background:#ef4444;color:#fff;font-size:9px;padding:1px 6px;border-radius:10px;margin-left:auto">' + dealer.activeClaims + '</span>';
      }
      if (item.badgeKey === 'pendingDocs' && pendingDocs > 0) {
        badge = '<span style="background:#f59e0b;color:#000;font-size:9px;padding:1px 6px;border-radius:10px;margin-left:auto">' + pendingDocs + '</span>';
      }
      var style = isActive
        ? 'display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;background:rgba(93,202,165,0.12);color:#5dcaa5;font-size:13px;font-weight:500;margin-bottom:2px;text-decoration:none;'
        : 'display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;color:#64748b;font-size:13px;margin-bottom:2px;text-decoration:none;transition:background 0.15s;';
      navHtml += '<a href="' + item.href + '" style="' + style + '"'
        + (!isActive ? ' onmouseover="this.style.background=\'rgba(255,255,255,0.04)\'" onmouseout="this.style.background=\'transparent\'"' : '')
        + '><span style="font-size:16px;width:20px;text-align:center">' + item.icon + '</span><span>' + item.label + '</span>' + badge + '</a>';
    }
    navHtml += '</nav>';

    sidebar.innerHTML = logoHtml + dealerHtml + navHtml;

    // Header bar (position: fixed)
    var header = document.createElement('header');
    header.id = 'shell-header';
    header.style.cssText = 'position:fixed;top:0;left:240px;right:0;height:56px;background:#0f172a;border-bottom:1px solid #1e293b;display:flex;align-items:center;justify-content:space-between;padding:0 24px;z-index:30;';

    var pageTitle = '';
    for (var j = 0; j < NAV.length; j++) {
      if (activePage === NAV[j].href || (activePage === '' && NAV[j].href === 'index.html')) {
        pageTitle = NAV[j].label;
        break;
      }
    }

    header.innerHTML = '<div style="font-size:16px;font-weight:600;color:#e2e8f0">' + pageTitle + '</div>'
      + '<div style="display:flex;align-items:center;gap:12px">'
      + '<button onclick="document.getElementById(\'notifPanel\').style.display=document.getElementById(\'notifPanel\').style.display===\'block\'?\'none\':\'block\'" style="position:relative;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:8px 12px;color:#94a3b8;cursor:pointer;font-size:14px">\u{1F514}'
      + (notifCount > 0 ? '<span style="position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:9px;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center">' + notifCount + '</span>' : '')
      + '</button>'
      + '<div style="font-size:12px;color:#64748b">' + dealer.name + '</div>'
      + '</div>';

    // Notification panel
    var notifPanel = document.createElement('div');
    notifPanel.id = 'notifPanel';
    notifPanel.style.cssText = 'display:none;position:fixed;top:56px;right:24px;width:340px;background:#1e293b;border:1px solid #334155;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.4);z-index:50;padding:16px;';
    var notifHtml = '<div style="font-size:12px;color:#64748b;margin-bottom:10px">\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F</div>';
    if (dealer.notifications) {
      for (var n = 0; n < dealer.notifications.length; n++) {
        var notif = dealer.notifications[n];
        notifHtml += '<div style="display:flex;align-items:center;gap:10px;padding:8px;background:#0f172a;border-radius:8px;margin-bottom:6px">'
          + '<span style="font-size:16px">' + notif.icon + '</span>'
          + '<div><div style="font-size:12px;color:#e2e8f0">' + notif.text + '</div><div style="font-size:10px;color:#475569">' + notif.time + '</div></div>'
          + '</div>';
      }
    }
    notifPanel.innerHTML = notifHtml;

    // Insert fixed elements at start of body — no DOM rearrangement needed
    document.body.insertBefore(notifPanel, document.body.firstChild);
    document.body.insertBefore(header, document.body.firstChild);
    document.body.insertBefore(sidebar, document.body.firstChild);
  }

  // Load dealer data and build shell
  fetch('data/dealers.json')
    .then(function(r) { return r.json(); })
    .then(function(data) { buildShell(data.current); })
    .catch(function(err) {
      console.error('Shell: failed to load dealer data', err);
      buildShell({ name: '\u0414\u0438\u043B\u0435\u0440', typeLabel: '\u041F\u0430\u0440\u0442\u043D\u0451\u0440', levelLabel: '\u0411\u0440\u043E\u043D\u0437\u0430', levelIcon: '\u{1F949}', points: 0, rank: '-', activeClaims: 0, notifications: [] });
    });
})();
