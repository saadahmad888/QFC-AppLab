/**
 * Data Table Component — JS
 * Author: Applab
 * Description: Handles add/remove columns & rows, inline editing,
 *              status badge colouring, and the link-picker modal.
 */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     Helpers
  ----------------------------------------------------------------------- */

  const SVG = {
    plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
           </svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
               <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
           </svg>`,
    edit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
           </svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
               </svg>`,
  };

  const STATUS_OPTIONS = ['Effective', 'Draft', 'Superseded', 'Expired', 'Pending'];
  const COLUMN_TYPES   = ['text', 'status', 'link'];

  /* -----------------------------------------------------------------------
     Build a status <select> element
  ----------------------------------------------------------------------- */
  function buildStatusSelect(value) {
    const sel = document.createElement('select');
    sel.className = 'dt-status-select';
    STATUS_OPTIONS.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.toLowerCase();
      o.textContent = opt;
      if (opt.toLowerCase() === (value || 'effective')) o.selected = true;
      sel.appendChild(o);
    });
    applyStatusColour(sel);
    sel.addEventListener('change', () => applyStatusColour(sel));
    return sel;
  }

  function applyStatusColour(sel) {
    sel.setAttribute('data-status', sel.value);
  }

  /* -----------------------------------------------------------------------
     Build a link cell
  ----------------------------------------------------------------------- */
  function buildLinkCell(label, href) {
    const wrap = document.createElement('div');
    wrap.className = 'dt-link-wrap';

    const anchor = document.createElement('a');
    anchor.className  = 'dt-link-anchor';
    anchor.href       = href || '#';
    anchor.target     = '_blank';
    anchor.rel        = 'noopener noreferrer';
    anchor.innerHTML  = SVG.download + (label || 'Download');

    const editBtn = document.createElement('button');
    editBtn.className   = 'dt-link-edit-btn';
    editBtn.title       = 'Edit link';
    editBtn.innerHTML   = SVG.edit;
    editBtn.type        = 'button';
    editBtn.addEventListener('click', () => openLinkModal(anchor));

    wrap.appendChild(anchor);
    wrap.appendChild(editBtn);
    return wrap;
  }

  /* -----------------------------------------------------------------------
     Build a plain text input cell
  ----------------------------------------------------------------------- */
  function buildTextInput(value) {
    const inp = document.createElement('input');
    inp.type        = 'text';
    inp.className   = 'dt-cell-input';
    inp.value       = value || '';
    inp.placeholder = '—';
    return inp;
  }

  /* -----------------------------------------------------------------------
     Build a <td> based on column type
  ----------------------------------------------------------------------- */
  function buildCell(type, value, href) {
    const td = document.createElement('td');
    td.dataset.colType = type;

    if (type === 'status') {
      const wrap = document.createElement('div');
      wrap.className = 'dt-status-wrap';
      wrap.appendChild(buildStatusSelect(value));
      td.appendChild(wrap);
    } else if (type === 'link') {
      td.appendChild(buildLinkCell(value, href));
    } else {
      td.appendChild(buildTextInput(value));
    }

    return td;
  }

  /* -----------------------------------------------------------------------
     Build delete-row button cell
  ----------------------------------------------------------------------- */
  function buildRowDelCell(tbody) {
    const td  = document.createElement('td');
    td.className = 'dt-row-del-cell';
    const btn = document.createElement('button');
    btn.type      = 'button';
    btn.className = 'dt-row-del-btn';
    btn.title     = 'Delete row';
    btn.innerHTML = SVG.trash;
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      if (tbody.rows.length > 1) row.remove();
    });
    td.appendChild(btn);
    return td;
  }

  /* -----------------------------------------------------------------------
     Initialise one .data-table-section instance
  ----------------------------------------------------------------------- */
  function initInstance(section) {
    const addRowBtn  = section.querySelector('[data-dt-action="add-row"]');
    const addColBtn  = section.querySelector('[data-dt-action="add-col"]');
    const table      = section.querySelector('.dt-table');
    const thead      = table.querySelector('thead');
    const tbody      = table.querySelector('tbody');

    /* ---- collect column meta from initial markup ---- */
    const headerRow  = thead.querySelector('tr');

    // Enhance existing header cells with editable inputs + delete buttons
    Array.from(headerRow.cells).forEach(th => {
      if (th.dataset.dtColType === 'del') return; // skip del col if pre-existing

      const type  = th.dataset.dtColType || 'text';
      const label = th.textContent.trim();

      // Replace text with an editable input
      th.innerHTML = '';
      const inp = document.createElement('input');
      inp.type      = 'text';
      inp.className = 'dt-th-input';
      inp.value     = label;
      th.appendChild(inp);

      // Type badge
      const badge = document.createElement('span');
      badge.className   = 'dt-th-type-badge';
      badge.textContent = `(${type})`;
      th.appendChild(badge);

      // Delete-column button
      const delBtn = document.createElement('button');
      delBtn.type      = 'button';
      delBtn.className = 'dt-col-del-btn';
      delBtn.title     = 'Delete column';
      delBtn.innerHTML = SVG.trash;
      delBtn.addEventListener('click', () => deleteColumn(table, th));
      th.appendChild(delBtn);
    });

    // Add the hidden "del row" header cell
    const delTh = document.createElement('th');
    delTh.dataset.dtColType = 'del';
    delTh.style.width = '40px';
    headerRow.appendChild(delTh);

    // Enhance existing body rows
    Array.from(tbody.rows).forEach(tr => {
      // Wrap existing cells properly
      Array.from(tr.cells).forEach((td, i) => {
        const th   = headerRow.cells[i];
        if (!th) return;
        const type = th.dataset.dtColType || 'text';
        if (type === 'del') return;

        const raw = td.textContent.trim();
        td.innerHTML = '';
        td.dataset.colType = type;

        if (type === 'status') {
          const wrap = document.createElement('div');
          wrap.className = 'dt-status-wrap';
          wrap.appendChild(buildStatusSelect(raw.toLowerCase()));
          td.appendChild(wrap);
        } else if (type === 'link') {
          const a = td.querySelector('a');
          td.appendChild(buildLinkCell(a ? a.textContent.trim() : raw, a ? a.href : '#'));
        } else {
          td.appendChild(buildTextInput(raw === '—' ? '' : raw));
        }
      });

      // Delete-row cell
      tr.appendChild(buildRowDelCell(tbody));
    });

    /* ---- Add Row ---- */
    addRowBtn && addRowBtn.addEventListener('click', () => {
      const tr = document.createElement('tr');
      const colCount = headerRow.cells.length;

      for (let i = 0; i < colCount; i++) {
        const th   = headerRow.cells[i];
        const type = th.dataset.dtColType || 'text';
        if (type === 'del') {
          tr.appendChild(buildRowDelCell(tbody));
        } else {
          tr.appendChild(buildCell(type));
        }
      }
      tbody.appendChild(tr);
      // Focus first input
      const first = tr.querySelector('input.dt-cell-input');
      if (first) first.focus();
    });

    /* ---- Add Column ---- */
    addColBtn && addColBtn.addEventListener('click', () => {
      openAddColModal(section, table, thead, tbody, headerRow);
    });
  }

  /* -----------------------------------------------------------------------
     Delete a column
  ----------------------------------------------------------------------- */
  function deleteColumn(table, th) {
    const idx = Array.from(th.parentNode.cells).indexOf(th);
    if (idx < 0) return;

    // Remove from each row
    table.querySelectorAll('tr').forEach(tr => {
      if (tr.cells[idx]) tr.deleteCell(idx);
    });
  }

  /* -----------------------------------------------------------------------
     Link picker modal
  ----------------------------------------------------------------------- */
  let _linkAnchorTarget = null;

  function openLinkModal(anchor) {
    _linkAnchorTarget = anchor;
    const modal  = document.getElementById('dt-link-modal');
    const lblInp = document.getElementById('dt-link-label');
    const urlInp = document.getElementById('dt-link-url');
    lblInp.value = anchor.textContent.replace(/^\s*/, '').replace(/\s*$/, '');
    urlInp.value = anchor.getAttribute('href') || '';
    modal.classList.add('is-open');
    lblInp.focus();
  }

  function closeLinkModal() {
    const modal = document.getElementById('dt-link-modal');
    modal.classList.remove('is-open');
    _linkAnchorTarget = null;
  }

  function saveLinkModal() {
    if (!_linkAnchorTarget) return;
    const label = document.getElementById('dt-link-label').value.trim() || 'Download';
    const url   = document.getElementById('dt-link-url').value.trim()   || '#';
    _linkAnchorTarget.href      = url;
    _linkAnchorTarget.innerHTML = SVG.download + label;
    closeLinkModal();
  }

  /* -----------------------------------------------------------------------
     Add Column modal
  ----------------------------------------------------------------------- */
  let _addColContext = null;

  function openAddColModal(section, table, thead, tbody, headerRow) {
    _addColContext = { table, thead, tbody, headerRow };
    const modal = document.getElementById('dt-addcol-modal');
    document.getElementById('dt-addcol-name').value = '';
    document.getElementById('dt-addcol-type').value = 'text';
    modal.classList.add('is-open');
    document.getElementById('dt-addcol-name').focus();
  }

  function closeAddColModal() {
    document.getElementById('dt-addcol-modal').classList.remove('is-open');
    _addColContext = null;
  }

  function saveAddColModal() {
    if (!_addColContext) return;
    const { table, tbody, headerRow } = _addColContext;
    const name = document.getElementById('dt-addcol-name').value.trim() || 'Column';
    const type = document.getElementById('dt-addcol-type').value;

    // Insert before the last (del) th
    const delTh = headerRow.querySelector('th[data-dt-col-type="del"]') ||
                  headerRow.cells[headerRow.cells.length - 1];
    const newTh = document.createElement('th');
    newTh.dataset.dtColType = type;

    const inp = document.createElement('input');
    inp.type      = 'text';
    inp.className = 'dt-th-input';
    inp.value     = name;
    newTh.appendChild(inp);

    const badge = document.createElement('span');
    badge.className   = 'dt-th-type-badge';
    badge.textContent = `(${type})`;
    newTh.appendChild(badge);

    const delBtn = document.createElement('button');
    delBtn.type      = 'button';
    delBtn.className = 'dt-col-del-btn';
    delBtn.title     = 'Delete column';
    delBtn.innerHTML = SVG.trash;
    delBtn.addEventListener('click', () => deleteColumn(table, newTh));
    newTh.appendChild(delBtn);

    headerRow.insertBefore(newTh, delTh);
    const newColIdx = Array.from(headerRow.cells).indexOf(newTh);

    // Add cell to each body row before the del cell
    Array.from(tbody.rows).forEach(tr => {
      const delTd = tr.cells[tr.cells.length - 1];
      tr.insertBefore(buildCell(type), delTd);
    });

    closeAddColModal();
  }

  /* -----------------------------------------------------------------------
     Wire up shared modals (created once per page, not per instance)
  ----------------------------------------------------------------------- */
  function initModals() {
    /* Link picker */
    const linkModal = document.getElementById('dt-link-modal');
    if (linkModal) {
      linkModal.querySelector('[data-dt-modal-action="cancel"]')
        .addEventListener('click', closeLinkModal);
      linkModal.querySelector('[data-dt-modal-action="save"]')
        .addEventListener('click', saveLinkModal);
      linkModal.querySelector('[data-dt-modal-action="close"]')
        .addEventListener('click', closeLinkModal);
      linkModal.addEventListener('click', e => {
        if (e.target === linkModal) closeLinkModal();
      });
    }

    /* Add Column */
    const addColModal = document.getElementById('dt-addcol-modal');
    if (addColModal) {
      addColModal.querySelector('[data-dt-modal-action="cancel"]')
        .addEventListener('click', closeAddColModal);
      addColModal.querySelector('[data-dt-modal-action="save"]')
        .addEventListener('click', saveAddColModal);
      addColModal.querySelector('[data-dt-modal-action="close"]')
        .addEventListener('click', closeAddColModal);
      addColModal.addEventListener('click', e => {
        if (e.target === addColModal) closeAddColModal();
      });

      // Enter key saves
      addColModal.addEventListener('keydown', e => {
        if (e.key === 'Enter') saveAddColModal();
        if (e.key === 'Escape') closeAddColModal();
      });
    }

    // Enter key in link modal
    if (linkModal) {
      linkModal.addEventListener('keydown', e => {
        if (e.key === 'Enter') saveLinkModal();
        if (e.key === 'Escape') closeLinkModal();
      });
    }
  }

  /* -----------------------------------------------------------------------
     Boot
  ----------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initModals();
    document.querySelectorAll('.data-table-section').forEach(initInstance);
  });

})();
