// ─── VISUALIZATIONS ──────────────────────────────────────────────────────────
// Each viz function takes a container element and step index, renders D3 chart

const Visualizations = {

  // ── Infinite Loop ────────────────────────────────────────────────────────
  infinite_loop: {
    title: 'Infinite Loop Visualization',
    subtitle: 'Loop invariant violated — counter never reaches termination condition',
    steps: [
      { label: 'Loop starts: i = 0, condition i < 5', counter: 0, running: false },
      { label: 'i = 0 → passes check, body executes, but i never increments!', counter: 0, running: true },
      { label: 'Loop checks again: i = 0 < 5 → still true — stuck forever', counter: 0, running: true, danger: true },
      { label: '⚠ Stack overflow / program hangs. Fix: add i++ in loop body', counter: 0, running: true, overflow: true }
    ],
    render(container, step) {
      container.innerHTML = '';
      const s = this.steps[step];
      const svg = d3.select(container).append('svg')
        .attr('width', '100%').attr('height', 320)
        .style('font-family', 'JetBrains Mono, monospace');
      const W = container.offsetWidth || 700, H = 320;

      // Arrow loop diagram
      const cx = W / 2, cy = 140, r = 80;
      // Loop circle
      svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r)
        .attr('fill', 'none').attr('stroke', s.danger ? '#ef4444' : '#3b82f6').attr('stroke-width', 2.5).attr('stroke-dasharray', s.running ? '8,4' : '0');
      // Counter box
      svg.append('rect').attr('x', cx - 40).attr('y', cy - 24).attr('width', 80).attr('height', 48)
        .attr('rx', 10).attr('fill', s.danger ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)')
        .attr('stroke', s.danger ? '#ef4444' : '#3b82f6').attr('stroke-width', 1.5);
      svg.append('text').attr('x', cx).attr('y', cy - 4).attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8').attr('font-size', 10).text('i =');
      svg.append('text').attr('x', cx).attr('y', cy + 18).attr('text-anchor', 'middle')
        .attr('fill', s.danger ? '#ef4444' : '#60a5fa').attr('font-size', 24).attr('font-weight', 'bold')
        .text(s.counter);
      // Arrow
      const arrowData = [{ x: cx + r, y: cy }, { x: cx + r + 30, y: cy - 20 }, { x: cx + r + 30, y: cy + 20 }, { x: cx + r, y: cy }];
      svg.append('path').attr('d', `M ${cx + r} ${cy} Q ${cx + r + 50} ${cy - 40} ${cx + r + 30} ${cy + 25}`)
        .attr('fill', 'none').attr('stroke', s.running ? '#f59e0b' : '#64748b').attr('stroke-width', 2).attr('marker-end', 'url(#arrow)');
      // Condition label
      svg.append('text').attr('x', cx).attr('y', cy - r - 16).attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8').attr('font-size', 12).text('while (i < 5)');
      // Status
      if (s.overflow) {
        svg.append('text').attr('x', cx).attr('y', cy + r + 32).attr('text-anchor', 'middle')
          .attr('fill', '#ef4444').attr('font-size', 14).attr('font-weight', 'bold').text('∞ INFINITE LOOP');
      }
      if (s.running) {
        svg.append('text').attr('x', cx + r + 42).attr('y', cy + 4).attr('fill', '#f59e0b').attr('font-size', 11).text('←loops back');
      }
      // Step label
      svg.append('text').attr('x', W / 2).attr('y', 300).attr('text-anchor', 'middle')
        .attr('fill', '#64748b').attr('font-size', 12).text(`Step ${step + 1}: ${s.label}`);
    },
    explanation: [
      '🔄 A loop requires a <strong>termination condition</strong> — a point where the loop variable satisfies the exit criterion.',
      '⚠️ Here <code>i</code> is never incremented, so <code>i < 5</code> is always true.',
      '♾️ The loop body executes forever — this violates the <strong>Loop Invariant</strong> principle.',
      '✅ Fix: add <code>i += 1</code> (or <code>i++</code>) inside the loop body so the invariant converges.'
    ]
  },

  // ── Off-by-One ───────────────────────────────────────────────────────────
  off_by_one: {
    title: 'Off-by-One Error Visualization',
    subtitle: 'Array index boundary violation — accessing one element beyond the valid range',
    steps: [
      { label: 'Array has 5 elements at indices 0..4', highlight: -1 },
      { label: 'Iterating: i = 0 to i ≤ 5 (should be i < 5)', highlight: -1 },
      { label: 'i = 5 → attempts to access arr[5] — out of bounds!', highlight: 5 },
      { label: 'Fix: use i < arr.length (strict less-than, not ≤)', highlight: -1, fixed: true }
    ],
    render(container, step) {
      container.innerHTML = '';
      const s = this.steps[step];
      const W = container.offsetWidth || 700, H = 320;
      const svg = d3.select(container).append('svg').attr('width', W).attr('height', H);
      const arr = [14, 7, 23, 41, 3];
      const cellW = 64, cellH = 56, startX = (W - (arr.length + 1) * (cellW + 8)) / 2, startY = 120;
      // Draw valid cells
      arr.forEach((v, i) => {
        const x = startX + i * (cellW + 8);
        svg.append('rect').attr('x', x).attr('y', startY).attr('width', cellW).attr('height', cellH)
          .attr('rx', 8).attr('fill', 'rgba(59,130,246,0.12)').attr('stroke', s.highlight === i ? '#ef4444' : '#3b82f6').attr('stroke-width', s.highlight === i ? 3 : 1.5);
        svg.append('text').attr('x', x + cellW / 2).attr('y', startY + 34).attr('text-anchor', 'middle')
          .attr('fill', '#f1f5f9').attr('font-size', 18).attr('font-weight', 'bold').attr('font-family', 'JetBrains Mono, monospace').text(v);
        svg.append('text').attr('x', x + cellW / 2).attr('y', startY + cellH + 18).attr('text-anchor', 'middle')
          .attr('fill', '#64748b').attr('font-size', 12).attr('font-family', 'JetBrains Mono, monospace').text(`[${i}]`);
      });
      // Draw OOB cell
      const oobX = startX + arr.length * (cellW + 8);
      svg.append('rect').attr('x', oobX).attr('y', startY).attr('width', cellW).attr('height', cellH).attr('rx', 8)
        .attr('fill', s.highlight === 5 ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.03)')
        .attr('stroke', s.highlight === 5 ? '#ef4444' : '#334155').attr('stroke-width', s.highlight === 5 ? 3 : 1).attr('stroke-dasharray', '6,3');
      svg.append('text').attr('x', oobX + cellW / 2).attr('y', startY + 34).attr('text-anchor', 'middle')
        .attr('fill', s.highlight === 5 ? '#ef4444' : '#334155').attr('font-size', 13).attr('font-weight', 'bold').text('???');
      svg.append('text').attr('x', oobX + cellW / 2).attr('y', startY + cellH + 18).attr('text-anchor', 'middle')
        .attr('fill', s.highlight === 5 ? '#ef4444' : '#475569').attr('font-size', 12).attr('font-family', 'JetBrains Mono, monospace').text('[5]');
      if (s.highlight === 5) {
        svg.append('text').attr('x', oobX + cellW / 2).attr('y', startY - 14).attr('text-anchor', 'middle')
          .attr('fill', '#ef4444').attr('font-size', 11).attr('font-weight', 'bold').text('OUT OF BOUNDS!');
      }
      // Label
      svg.append('text').attr('x', W / 2).attr('y', 72).attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8').attr('font-size', 13).text(s.fixed ? '✅ Fixed: for (i = 0; i < arr.length; i++)' : 'for (i = 0; i <= arr.length; i++)  ← BUG');
      svg.append('text').attr('x', W / 2).attr('y', 290).attr('text-anchor', 'middle')
        .attr('fill', '#64748b').attr('font-size', 12).text(`Step ${step + 1}: ${s.label}`);
    },
    explanation: [
      '📦 Arrays are zero-indexed: a 5-element array has valid indices <code>0, 1, 2, 3, 4</code>.',
      '🔢 Using <code>i ≤ arr.length</code> attempts index <code>5</code> — one past the last valid element.',
      '💥 This causes an <strong>IndexOutOfBounds</strong> exception at runtime — the classic off-by-one error.',
      '✅ Always use strict less-than: <code>i < arr.length</code> to stay within valid bounds.'
    ]
  },

  // ── No Base Case ─────────────────────────────────────────────────────────
  no_base_case: {
    title: 'Missing Base Case — Infinite Recursion',
    subtitle: 'Recursive function stack grows without bound',
    steps: [
      { label: 'factorial(5) calls factorial(5) — wait, n never decreases!', depth: 1 },
      { label: 'Stack grows: factorial(5) → factorial(5) → factorial(5)…', depth: 3 },
      { label: 'Stack keeps growing: 100s of frames, RAM filling up', depth: 7 },
      { label: '💥 Stack Overflow! Fix: return n * factorial(n-1)', depth: 9, overflow: true }
    ],
    render(container, step) {
      container.innerHTML = '';
      const s = this.steps[step];
      const W = container.offsetWidth || 700, H = 320;
      const svg = d3.select(container).append('svg').attr('width', W).attr('height', H);
      const frameH = 28, frameW = 200, cx = W / 2;
      const maxFrames = Math.min(s.depth, 8);
      for (let i = 0; i < maxFrames; i++) {
        const y = 260 - i * (frameH + 4);
        const isTop = i === maxFrames - 1;
        svg.append('rect').attr('x', cx - frameW / 2).attr('y', y).attr('width', frameW).attr('height', frameH).attr('rx', 6)
          .attr('fill', s.overflow && isTop ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.1)')
          .attr('stroke', s.overflow && isTop ? '#ef4444' : '#3b82f6').attr('stroke-width', isTop ? 2 : 1);
        svg.append('text').attr('x', cx).attr('y', y + 18).attr('text-anchor', 'middle')
          .attr('fill', isTop ? (s.overflow ? '#ef4444' : '#60a5fa') : '#64748b')
          .attr('font-size', 12).attr('font-family', 'JetBrains Mono, monospace')
          .text(`factorial(5)  [frame ${i + 1}]`);
      }
      if (s.depth > 8) {
        svg.append('text').attr('x', cx).attr('y', 30).attr('text-anchor', 'middle')
          .attr('fill', '#ef4444').attr('font-size', 16).attr('font-weight', 'bold').text('⚠ STACK OVERFLOW');
      }
      svg.append('text').attr('x', W / 2).attr('y', 300).attr('text-anchor', 'middle')
        .attr('fill', '#64748b').attr('font-size', 12).text(`Step ${step + 1}: ${s.label}`);
      svg.append('text').attr('x', cx - frameW / 2 - 16).attr('y', 145).attr('fill', '#64748b').attr('font-size', 11).text('Stack');
      svg.append('text').attr('x', cx - frameW / 2 - 16).attr('y', 158).attr('fill', '#64748b').attr('font-size', 11).text('grows ↑');
    },
    explanation: [
      '🔁 Recursion works by solving a smaller version of the same problem, then combining results.',
      '🛑 A <strong>base case</strong> is essential — it tells the function when to stop recursing.',
      '📈 Without it, <code>factorial(5)</code> calls <code>factorial(5)</code> forever, filling the call stack.',
      '✅ Fix: <code>return n * factorial(n - 1)</code> — n decrements toward base case <code>n == 0</code>.'
    ]
  },

  // ── Reference Equality ───────────────────────────────────────────────────
  reference_equality: {
    title: 'Reference vs Value Equality',
    subtitle: '== compares memory addresses, not content',
    steps: [
      { label: 'Two strings "hello" created — stored at different memory locations', sameRef: false },
      { label: 'a == b checks if they point to SAME object in memory', sameRef: false, checking: true },
      { label: 'They are different objects → == returns false, even if content matches!', sameRef: false, result: false },
      { label: 'Fix: use .equals() or === value check → compares content → true', sameRef: true, result: true }
    ],
    render(container, step) {
      container.innerHTML = '';
      const s = this.steps[step];
      const W = container.offsetWidth || 700, H = 320;
      const svg = d3.select(container).append('svg').attr('width', W).attr('height', H);
      // Memory boxes
      const boxW = 120, boxH = 60;
      const ax = W / 2 - 160, bx = W / 2 + 40, by = 120;
      // Box A
      svg.append('rect').attr('x', ax).attr('y', by).attr('width', boxW).attr('height', boxH).attr('rx', 10)
        .attr('fill', 'rgba(59,130,246,0.1)').attr('stroke', '#3b82f6').attr('stroke-width', 2);
      svg.append('text').attr('x', ax + boxW / 2).attr('y', by + 22).attr('text-anchor', 'middle').attr('fill', '#94a3b8').attr('font-size', 11).text('0x4A2F (Heap)');
      svg.append('text').attr('x', ax + boxW / 2).attr('y', by + 44).attr('text-anchor', 'middle').attr('fill', '#60a5fa').attr('font-size', 16).attr('font-weight', 'bold').attr('font-family', 'JetBrains Mono, monospace').text('"hello"');
      svg.append('text').attr('x', ax + boxW / 2).attr('y', by - 12).attr('text-anchor', 'middle').attr('fill', '#c4b5fd').attr('font-size', 13).text('a →');
      // Box B
      svg.append('rect').attr('x', bx).attr('y', by).attr('width', boxW).attr('height', boxH).attr('rx', 10)
        .attr('fill', 'rgba(139,92,246,0.1)').attr('stroke', s.sameRef ? '#10b981' : '#8b5cf6').attr('stroke-width', 2);
      svg.append('text').attr('x', bx + boxW / 2).attr('y', by + 22).attr('text-anchor', 'middle').attr('fill', '#94a3b8').attr('font-size', 11).text(s.sameRef ? '0x4A2F (Heap)' : '0x7B91 (Heap)');
      svg.append('text').attr('x', bx + boxW / 2).attr('y', by + 44).attr('text-anchor', 'middle').attr('fill', '#c4b5fd').attr('font-size', 16).attr('font-weight', 'bold').attr('font-family', 'JetBrains Mono, monospace').text('"hello"');
      svg.append('text').attr('x', bx + boxW / 2).attr('y', by - 12).attr('text-anchor', 'middle').attr('fill', '#c4b5fd').attr('font-size', 13).text('b →');
      // Equality indicator
      if (s.checking || s.result !== undefined) {
        const midX = W / 2;
        svg.append('text').attr('x', midX).attr('y', by + 38).attr('text-anchor', 'middle')
          .attr('fill', s.result === true ? '#10b981' : s.result === false ? '#ef4444' : '#f59e0b')
          .attr('font-size', 20).attr('font-weight', 'bold')
          .text(s.result === true ? '== ✓ true' : s.result === false ? '== ✗ false' : '== ?');
      }
      svg.append('text').attr('x', W / 2).attr('y', 260).attr('text-anchor', 'middle').attr('fill', '#64748b').attr('font-size', 12).text(`Step ${step + 1}: ${s.label}`);
    },
    explanation: [
      '🧠 In most languages, objects/strings live on the <strong>heap</strong> and are referenced by pointers.',
      '🔗 <code>==</code> on objects compares the <em>memory address</em> (reference), not the content.',
      '❌ Two separately created <code>"hello"</code> strings have different addresses → <code>==</code> returns false.',
      '✅ Use <code>.equals()</code> in Java, <code>===</code> with value types in JS, or <code>==</code> in Python (which compares content for strings).'
    ]
  },

  // ── Integer Division ─────────────────────────────────────────────────────
  integer_division: {
    title: 'Integer Division Precision Loss',
    subtitle: 'Fractional part silently truncated — silent data corruption',
    steps: [
      { label: 'Computing: result = 7 / 2 in a typed language', numerator: 7, denominator: 2 },
      { label: 'Expected: 3.5 — but both operands are integers...', expected: 3.5, got: null },
      { label: 'Integer division truncates toward zero: result = 3 (not 3.5!)', expected: 3.5, got: 3 },
      { label: 'Fix: cast to float first → 7.0 / 2 = 3.5', expected: 3.5, got: 3.5, fixed: true }
    ],
    render(container, step) {
      container.innerHTML = '';
      const s = this.steps[step];
      const W = container.offsetWidth || 700, H = 320;
      const svg = d3.select(container).append('svg').attr('width', W).attr('height', H);
      const cx = W / 2;
      // Division display
      svg.append('text').attr('x', cx).attr('y', 90).attr('text-anchor', 'middle').attr('fill', '#60a5fa')
        .attr('font-size', 42).attr('font-weight', 'bold').attr('font-family', 'JetBrains Mono, monospace').text('7 ÷ 2');
      svg.append('line').attr('x1', cx - 80).attr('y1', 108).attr('x2', cx + 80).attr('y2', 108).attr('stroke', '#334155').attr('stroke-width', 2);
      // Expected
      if (s.expected !== null) {
        svg.append('text').attr('x', cx - 80).attr('y', 160).attr('fill', '#94a3b8').attr('font-size', 13).text('Expected:');
        svg.append('text').attr('x', cx + 20).attr('y', 160).attr('fill', '#10b981').attr('font-size', 22).attr('font-weight', 'bold').attr('font-family', 'JetBrains Mono, monospace').text(s.expected);
      }
      // Got
      if (s.got !== null) {
        svg.append('text').attr('x', cx - 80).attr('y', 200).attr('fill', '#94a3b8').attr('font-size', 13).text('Got:');
        svg.append('text').attr('x', cx + 20).attr('y', 200)
          .attr('fill', s.fixed ? '#10b981' : '#ef4444').attr('font-size', 22).attr('font-weight', 'bold').attr('font-family', 'JetBrains Mono, monospace')
          .text(s.got);
        if (!s.fixed && s.got !== null) {
          svg.append('text').attr('x', cx + 80).attr('y', 200).attr('fill', '#ef4444').attr('font-size', 14).text('← .5 truncated!');
        }
      }
      svg.append('text').attr('x', W / 2).attr('y', 290).attr('text-anchor', 'middle').attr('fill', '#64748b').attr('font-size', 12).text(`Step ${step + 1}: ${s.label}`);
    },
    explanation: [
      '🔢 In statically typed languages (Java, C, C++), dividing two integers performs <strong>integer division</strong>.',
      '✂️ The fractional part is silently truncated — not rounded, just discarded.',
      '🚨 This is a silent bug — no error is thrown, but results are wrong.',
      '✅ Cast one operand to float: <code>(float)7 / 2</code> or <code>7.0 / 2</code> to get <code>3.5</code>.'
    ]
  },

  // ── Null Check ───────────────────────────────────────────────────────────
  null_check: {
    title: 'Missing Null/None Check',
    subtitle: 'Dereferencing null causes NullPointerException',
    steps: [
      { label: 'Function returns None when user not found in DB', hasNull: true, checked: false },
      { label: 'Code immediately calls user.name without checking', hasNull: true, checked: false, accessing: true },
      { label: '💥 NullPointerException / AttributeError — None has no .name', hasNull: true, crashed: true },
      { label: 'Fix: check if user is not None before accessing .name', hasNull: true, checked: true }
    ],
    render(container, step) {
      container.innerHTML = '';
      const s = this.steps[step];
      const W = container.offsetWidth || 700, H = 320;
      const svg = d3.select(container).append('svg').attr('width', W).attr('height', H);
      const cx = W / 2;
      // DB box
      svg.append('rect').attr('x', cx - 260).attr('y', 60).attr('width', 120).attr('height', 60).attr('rx', 10)
        .attr('fill', 'rgba(59,130,246,0.1)').attr('stroke', '#3b82f6').attr('stroke-width', 2);
      svg.append('text').attr('x', cx - 200).attr('y', 87).attr('text-anchor', 'middle').attr('fill', '#60a5fa').attr('font-size', 13).text('Database');
      svg.append('text').attr('x', cx - 200).attr('y', 105).attr('text-anchor', 'middle').attr('fill', '#94a3b8').attr('font-size', 11).text('find_user(id=999)');
      // Arrow to variable
      svg.append('line').attr('x1', cx - 140).attr('y1', 90).attr('x2', cx - 40).attr('y2', 90).attr('stroke', '#475569').attr('stroke-width', 2);
      // Variable box
      svg.append('rect').attr('x', cx - 40).attr('y', 64).attr('width', 110).attr('height', 52).attr('rx', 10)
        .attr('fill', s.hasNull ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)')
        .attr('stroke', s.hasNull ? '#ef4444' : '#10b981').attr('stroke-width', 2);
      svg.append('text').attr('x', cx + 15).attr('y', 87).attr('text-anchor', 'middle').attr('fill', '#94a3b8').attr('font-size', 11).text('user =');
      svg.append('text').attr('x', cx + 15).attr('y', 106).attr('text-anchor', 'middle')
        .attr('fill', s.hasNull ? '#ef4444' : '#10b981').attr('font-size', 15).attr('font-weight', 'bold').attr('font-family', 'JetBrains Mono, monospace')
        .text(s.hasNull ? 'None' : '{name: "Ali"}');
      // Access arrow
      if (s.accessing || s.crashed) {
        svg.append('line').attr('x1', cx + 70).attr('y1', 90).attr('x2', cx + 140).attr('y2', 90).attr('stroke', s.crashed ? '#ef4444' : '#f59e0b').attr('stroke-width', 2);
        svg.append('text').attr('x', cx + 160).attr('y', 87).attr('fill', s.crashed ? '#ef4444' : '#f59e0b').attr('font-size', 12).text('.name');
        if (s.crashed) {
          svg.append('text').attr('x', cx + 155).attr('y', 110).attr('fill', '#ef4444').attr('font-size', 11).text('💥 CRASH');
        }
      }
      // Null check
      if (s.checked) {
        svg.append('rect').attr('x', cx - 40).attr('y', 155).attr('width', 200).attr('height', 48).attr('rx', 10)
          .attr('fill', 'rgba(16,185,129,0.08)').attr('stroke', '#10b981').attr('stroke-width', 1.5);
        svg.append('text').attr('x', cx + 60).attr('y', 176).attr('text-anchor', 'middle').attr('fill', '#6ee7b7').attr('font-size', 12).attr('font-family', 'JetBrains Mono, monospace').text('if user is not None:');
        svg.append('text').attr('x', cx + 60).attr('y', 194).attr('text-anchor', 'middle').attr('fill', '#10b981').attr('font-size', 12).attr('font-family', 'JetBrains Mono, monospace').text('    print(user.name)');
      }
      svg.append('text').attr('x', W / 2).attr('y', 290).attr('text-anchor', 'middle').attr('fill', '#64748b').attr('font-size', 12).text(`Step ${step + 1}: ${s.label}`);
    },
    explanation: [
      '⚠️ Functions that search or fetch data often return <code>null</code>/<code>None</code> when the item is not found.',
      '💥 Calling a method on <code>null</code> immediately throws a <strong>NullPointerException</strong> or <code>AttributeError</code>.',
      '🛡️ This is one of the most common runtime bugs in production software.',
      '✅ Always guard with <code>if user is not None:</code> before accessing properties.'
    ]
  }
};
