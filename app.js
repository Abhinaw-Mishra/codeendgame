// ─── SNIPPETS ────────────────────────────────────────────────────────────────
const SNIPPETS = {
  infinite_loop: `# Infinite Loop — i never increments
def sum_list(nums):
    total = 0
    i = 0
    while i < len(nums):
        total += nums[i]
        # BUG: i is never incremented!
    return total

print(sum_list([1,2,3,4,5]))`,

  off_by_one: `# Off-by-One Error
def print_all(arr):
    i = 0
    while i <= len(arr):   # BUG: should be i < len(arr)
        print(arr[i])
        i += 1

print_all([10, 20, 30, 40, 50])`,

  no_base_case: `# Missing Base Case in Recursion
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n)   # BUG: should be factorial(n-1)

print(factorial(5))`,

  reference_equality: `// Reference Equality Bug (JavaScript)
function areEqual(a, b) {
    return a == b;   // BUG: compares references, not content
}

let s1 = new String("hello");
let s2 = new String("hello");
console.log(areEqual(s1, s2));  // prints false!`,

  list_mutation: `# Modifying list while iterating
def remove_evens(nums):
    for num in nums:          # BUG: mutating list during iteration
        if num % 2 == 0:
            nums.remove(num)
    return nums

print(remove_evens([1,2,3,4,5,6]))`,

  integer_division: `# Integer Division Precision Loss
def average(a, b):
    return a + b / 2   # BUG: operator precedence + integer division

def percentage(part, total):
    return part / total * 100   # May truncate in Python 2 / Java / C

result = 7 / 2   # BUG: gives 3, not 3.5 in typed languages
print(result)`,

  null_check: `# Missing Null/None Check
def get_username(user_id):
    user = find_user(user_id)   # may return None
    return user.name            # BUG: no None check before access

def find_user(uid):
    if uid == 42:
        return {"name": "Alice"}
    return None

print(get_username(99))`,

  correct_code: `# Correct Code — Binary Search (No Errors)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

nums = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(nums, 7))  # Output: 3`,

  // ── JAVA SNIPPETS ──────────────────────────────────────────────────────
  java_null: `// Java: NullPointerException
public class Main {
    static String findUser(int id) {
        if (id == 42) return "Alice";
        return null; // user not found
    }

    public static void main(String[] args) {
        String user = findUser(99);
        // BUG: no null check before calling .length()
        System.out.println(user.length());
    }
}`,

  java_ref_eq: `// Java: String == vs .equals()
public class Main {
    public static void main(String[] args) {
        String a = new String("hello");
        String b = new String("hello");

        // BUG: == compares references, not content
        if (a == b) {
            System.out.println("Equal");
        } else {
            System.out.println("Not equal"); // always prints this!
        }
        // Fix: use a.equals(b)
    }
}`,

  java_int_div: `// Java: Integer Division Precision Loss
public class Main {
    public static void main(String[] args) {
        int total = 7;
        int count = 2;

        // BUG: integer division truncates — gives 3, not 3.5
        double avg = total / count;
        System.out.println(avg); // prints 3.0, not 3.5!

        // Fix: cast to double first
        // double avg = (double) total / count;
    }
}`,

  java_infinite: `// Java: Infinite Loop
public class Main {
    public static void main(String[] args) {
        int i = 0;
        int sum = 0;
        while (i < 10) {
            sum += i;
            // BUG: i is never incremented!
        }
        System.out.println(sum);
    }
}`,

  java_off_by_one: `// Java: Off-by-One Array Error
public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};

        // BUG: i <= arr.length accesses index 5 (out of bounds)
        for (int i = 0; i <= arr.length; i++) {
            System.out.println(arr[i]); // ArrayIndexOutOfBoundsException!
        }
    }
}`,

  // ── C SNIPPETS ─────────────────────────────────────────────────────────
  c_buffer_overflow: `// C: Buffer Overflow
#include <stdio.h>
#include <string.h>

int main() {
    char buf[5];  // only 5 bytes
    // BUG: strcpy doesn't check destination size!
    strcpy(buf, "HelloWorld");  // writes 10+ bytes into 5-byte buffer
    printf("%s\n", buf);        // undefined behavior / crash
    return 0;
}`,

  c_dangling_ptr: `// C: Dangling Pointer (Use After Free)
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int*) malloc(sizeof(int));
    *ptr = 42;
    free(ptr);            // memory is freed

    // BUG: ptr still points to freed memory!
    printf("%d\n", *ptr); // undefined behavior
    return 0;
}`,

  c_infinite: `// C: Infinite Loop
#include <stdio.h>

int main() {
    int i = 0;
    int sum = 0;
    while (i < 10) {
        sum += i;
        // BUG: i never incremented — loops forever!
    }
    printf("Sum: %d\n", sum);
    return 0;
}`,

  c_int_div: `// C: Integer Division Precision Loss
#include <stdio.h>

int main() {
    int a = 7, b = 2;

    // BUG: both operands are int — result is 3, not 3.5
    float result = a / b;
    printf("%f\n", result); // prints 3.000000, not 3.500000

    // Fix: float result = (float)a / b;
    return 0;
}`,

  c_off_by_one: `// C: Off-by-One Error
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    // BUG: i <= 5 accesses arr[5] — out of bounds!
    for (int i = 0; i <= 5; i++) {
        printf("%d\n", arr[i]); // undefined behavior at i=5
    }
    return 0;
}`
};

// ─── RULES ENGINE ────────────────────────────────────────────────────────────
const RULES = [
  {
    id: 'infinite_loop',
    test(code) { 
      const m = code.match(/while\s*\(?[^):\{]+[):\{]([\s\S]*)/);
      return m ? !/(\+\+|--|\+=|-=|=)/.test(m[1]) : false;
    },
    severity: 'critical',
    title: 'Potential Infinite Loop',
    concept: 'Loop Invariant',
    conceptIcon: '🔄',
    getLine(lines) { for (let i = 0; i < lines.length; i++) if (/while/.test(lines[i])) return i + 1; return 1; },
    description: 'A loop variable does not appear to be modified inside the loop body. The termination condition may never become false, causing the program to hang indefinitely.',
    fix: '# Ensure the loop variable is updated:\ni = 0\nwhile i < n:\n    do_work()\n    i += 1  # ← add this'
  },
  {
    id: 'off_by_one',
    test(code) { return /<=\s*(?:len\(|\w+\.length|sizeof|size\(\))/.test(code); },
    severity: 'critical',
    title: 'Off-by-One Error',
    concept: 'Array Indexing & Bounds',
    conceptIcon: '📦',
    getLine(lines) { for (let i = 0; i < lines.length; i++) if (/<=\s*(?:len\(|\.length|sizeof)/.test(lines[i])) return i + 1; return 1; },
    description: 'Using <= with array length will access an index one past the last valid element. Arrays are zero-indexed, so valid indices run from 0 to length-1.',
    fix: '# Use strict less-than:\nwhile i < len(arr):  # NOT <=\n    process(arr[i])\n    i += 1'
  },
  {
    id: 'no_base_case',
    test(code) {
      const m = code.match(/(?:def|function)\s+(\w+)\s*\(\s*(\w+)\s*\)/);
      if (m && m[1] && m[2]) {
        const re = new RegExp(m[1] + "\\s*\\(\\s*" + m[2] + "\\s*\\)");
        const body = code.substring(code.indexOf(m[0]) + m[0].length);
        return re.test(body);
      }
      return false;
    },
    severity: 'critical',
    title: 'Infinite Recursion — Argument Not Decremented',
    concept: 'Recursion & Call Stack',
    conceptIcon: '📚',
    getLine(lines) {
      const m = lines.join('\n').match(/(?:def|function)\s+(\w+)\s*\(\s*(\w+)\s*\)/);
      if(m) { for (let i = 0; i < lines.length; i++) if (new RegExp(m[1] + "\\s*\\(\\s*" + m[2] + "\\s*\\)").test(lines[i])) return i + 1; }
      return 1;
    },
    description: 'A recursive call passes the same argument without decrementing it. The function will never reach its base case, causing the call stack to overflow.',
    fix: '# Decrement the argument in each recursive call:\ndef factorial(n):\n    if n == 0: return 1\n    return n * factorial(n - 1)  # ← n-1, not n'
  },
  {
    id: 'reference_equality',
    test(code) { return /==/.test(code) && !/===/.test(code) && /(?:new\s+(?:String|Object|Integer|Boolean)|\[\]|\{\})/.test(code); },
    severity: 'warning',
    title: 'Reference Equality on Objects',
    concept: 'Reference vs. Value Semantics',
    conceptIcon: '🔗',
    getLine(lines) { for (let i = 0; i < lines.length; i++) if (/==/.test(lines[i]) && !/===/.test(lines[i])) return i + 1; return 1; },
    description: 'Using == on object types compares memory references (addresses), not the contents. Two separately created objects with equal content will compare as unequal.',
    fix: '// Use .equals() for object comparison:\nreturn a.equals(b);  // Java\n// or === with primitives in JS'
  },
  {
    id: 'list_mutation',
    test(code) { return /for\s+\w+\s+(?:in|of)\s+(\w+)[\s\S]{1,150}\1\.(?:remove|splice|pop|shift)\(/.test(code); },
    severity: 'critical',
    title: 'Modifying List During Iteration',
    concept: 'Iterator Invalidation',
    conceptIcon: '⚠️',
    getLine(lines) { for (let i = 0; i < lines.length; i++) if (/\.(remove|splice|pop|shift)\(/.test(lines[i])) return i + 1; return 1; },
    description: 'Removing elements from a list while iterating over it with a for loop causes items to be skipped. The iterator\'s internal index becomes invalid after each removal.',
    fix: '# Iterate over a copy instead:\nfor num in nums[:]:      # slice copy\n    if num % 2 == 0:\n        nums.remove(num)'
  },
  {
    id: 'integer_division',
    test(code) { return /\b\d+\s*\/\s*\d+\b/.test(code) && !/\./.test(code); },
    severity: 'warning',
    title: 'Integer Division / Operator Precedence',
    concept: 'Data Types & Type Coercion',
    conceptIcon: '🔢',
    getLine(lines) { for (let i = 0; i < lines.length; i++) if (/\b\d+\s*\/\s*\d+\b/.test(lines[i])) return i + 1; return 1; },
    description: 'Dividing two integers may silently truncate the decimal portion. Also, a + b / 2 computes b/2 first due to operator precedence — likely not what you intended.',
    fix: '# Cast to float for true division:\nresult = 7.0 / 2        # = 3.5\n# For average:\nresult = (a + b) / 2.0  # parentheses matter!'
  },
  {
    id: 'null_check',
    test(code) { return /(?:return|=>)\s+(?:None|null)/.test(code) && /\.\w+/.test(code) && !/(?:if\s*\(.*(?:None|null)|if\s+.*(?:is not None|!= null))/.test(code); },
    severity: 'warning',
    title: 'Missing Null/None Check',
    concept: 'Null Safety & Defensive Programming',
    conceptIcon: '🛡️',
    getLine(lines) { for (let i = 0; i < lines.length; i++) if (/\.\w+/.test(lines[i]) && !/def |#|if /.test(lines[i])) return i + 1; return 1; },
    description: 'A function that may return None/null is called, and its result is immediately accessed without a null check. This will throw a NullPointerException or AttributeError at runtime.',
    fix: '# Always guard before accessing:\nuser = find_user(uid)\nif user is not None:\n    return user.name\nreturn "Unknown"'
  }
];

// ─── LANGUAGE-SPECIFIC RULES (Java + C) ───────────────────────────────────────
const JAVA_RULES = [
  {
    id: 'java_null_ptr',
    test(code) { return /return\s+null/.test(code) && /\.\w+\(/.test(code) && !/if\s*\(.*null/.test(code); },
    severity: 'critical', title: 'Potential NullPointerException',
    concept: 'Null Safety', conceptIcon: '🛡️',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/\.\w+\(/.test(lines[i]) && !/if|null|=/.test(lines[i])) return i+1; return 1; },
    description: 'A method that may return null is called, and its result is immediately used without a null check. This throws NullPointerException at runtime.',
    fix: '// Always guard null returns:\nif (user != null) {\n    System.out.println(user.length());\n}'
  },
  {
    id: 'java_string_eq',
    test(code) { return /String\s+\w+\s*=\s*(?:new\s+String|"[^"]*")/.test(code) && /==/.test(code) && !/\.equals/.test(code); },
    severity: 'critical', title: 'String Reference Equality Bug',
    concept: 'Reference vs. Value Semantics', conceptIcon: '🔗',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/==/.test(lines[i]) && !/equals|===/.test(lines[i])) return i+1; return 1; },
    description: 'In Java, == on String objects compares memory addresses, not content. Two new String("x") objects are always unequal with ==.',
    fix: '// Use .equals() to compare string content:\nif (a.equals(b)) { ... }\n// or for null-safety:\nObjects.equals(a, b)'
  },
  {
    id: 'java_int_div',
    test(code) { return /double\s+\w+\s*=\s*[\w\d]+\s*\/\s*[\w\d]+/.test(code) && /int\s+\w+\s*=/.test(code); },
    severity: 'warning', title: 'Integer Division Assigned to Double',
    concept: 'Data Types & Type Coercion', conceptIcon: '🔢',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/double.*=.*\//.test(lines[i])) return i+1; return 1; },
    description: 'Even though the result variable is double, if both operands are int the division is computed as integer first, then widened. The decimal part is already lost.',
    fix: '// Cast one operand to double before dividing:\ndouble avg = (double) total / count;'
  },
  {
    id: 'java_off_by_one',
    test(code) { return /<=\s*\w+\.length/.test(code); },
    severity: 'critical', title: 'Off-by-One — ArrayIndexOutOfBoundsException',
    concept: 'Array Indexing & Bounds', conceptIcon: '📦',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/<=.*length/.test(lines[i])) return i+1; return 1; },
    description: 'Using i <= arr.length iterates one past the last valid index (length-1), causing ArrayIndexOutOfBoundsException.',
    fix: '// Use strict less-than:\nfor (int i = 0; i < arr.length; i++) { ... }'
  },
  {
    id: 'java_infinite',
    test(code) { 
      const m = code.match(/while\s*\(?[^):\{]+[):\{]([\s\S]*)/);
      return m ? !/(\+\+|--|\+=|-=|=)/.test(m[1]) : false;
    },
    severity: 'critical', title: 'Potential Infinite Loop',
    concept: 'Loop Invariant', conceptIcon: '🔄',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/while\s*\(/.test(lines[i])) return i+1; return 1; },
    description: 'The loop counter does not appear to be incremented. The while condition will never become false, causing an infinite loop.',
    fix: '// Add increment inside loop body:\nwhile (i < 10) {\n    sum += i;\n    i++;  // ← required\n}'
  }
];

const C_RULES = [
  {
    id: 'c_buffer_overflow',
    test(code) { return /(?:strcpy|gets|sprintf)\s*\(/.test(code); },
    severity: 'critical', title: 'Buffer Overflow Risk',
    concept: 'Memory Safety & Bounds Checking', conceptIcon: '💥',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/(?:strcpy|gets|sprintf)\(/.test(lines[i])) return i+1; return 1; },
    description: 'strcpy() and gets() do not check destination buffer size. Writing more bytes than allocated causes a buffer overflow — corrupting memory or enabling exploits.',
    fix: '// Use safe alternatives:\nstrncpy(buf, src, sizeof(buf) - 1);\nbuf[sizeof(buf)-1] = \"\\0\"; // ensure null terminator'
  },
  {
    id: 'c_dangling_ptr',
    test(code) { 
      const m = code.match(/free\s*\(\s*(\w+)\s*\)/);
      return m && m[1] && new RegExp(`\\*\\s*${m[1]}`).test(code.substring(code.indexOf(m[0])));
    },
    severity: 'critical', title: 'Dangling Pointer — Use After Free',
    concept: 'Memory Management & Pointers', conceptIcon: '👻',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/free\s*\(/.test(lines[i])) return i+1; return 1; },
    description: 'After calling free(), the pointer still holds the old memory address. Dereferencing it is undefined behavior — the memory may have been reallocated to something else.',
    fix: '// Set pointer to NULL after freeing:\nfree(ptr);\nptr = NULL;  // prevents accidental dereference'
  },
  {
    id: 'c_int_div',
    test(code) { return /float\s+\w+\s*=\s*\w+\s*\/\s*\w+/.test(code) && /int\s+/.test(code); },
    severity: 'warning', title: 'Integer Division Assigned to Float',
    concept: 'Data Types & Type Coercion', conceptIcon: '🔢',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/float.*=.*\//.test(lines[i])) return i+1; return 1; },
    description: 'When dividing two int values, C performs integer division first and truncates the decimal. The result is then widened to float — but precision is already lost.',
    fix: '// Cast at least one operand to float:\nfloat result = (float)a / b;'
  },
  {
    id: 'c_infinite',
    test(code) { 
      const m = code.match(/while\s*\(?[^):\{]+[):\{]([\s\S]*)/);
      return m ? !/(\+\+|--|\+=|-=|=)/.test(m[1]) : false;
    },
    severity: 'critical', title: 'Potential Infinite Loop',
    concept: 'Loop Invariant', conceptIcon: '🔄',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/while\s*\(/.test(lines[i])) return i+1; return 1; },
    description: 'The loop variable is never modified inside the loop body. The termination condition will never become false.',
    fix: '// Increment inside loop:\nwhile (i < 10) {\n    sum += i;\n    i++;  // ← add this\n}'
  },
  {
    id: 'c_off_by_one',
    test(code) { return /<=\s*\w+/.test(code) && /\[\w+\]/.test(code) && /for\s*\(/.test(code); },
    severity: 'critical', title: 'Off-by-One Array Access',
    concept: 'Array Indexing & Bounds', conceptIcon: '📦',
    getLine(lines) { for (let i=0;i<lines.length;i++) if (/<=\s*\d+/.test(lines[i]) && /for/.test(lines[i])) return i+1; return 1; },
    description: 'Accessing an array with index equal to its declared size is out of bounds. C arrays are 0-indexed; a 5-element array has valid indices 0–4 only.',
    fix: '// Use strict less-than:\nfor (int i = 0; i < 5; i++) { ... }'
  }
];

// ─── CS CONCEPTS DATA ─────────────────────────────────────────────────────────
const CS_CONCEPTS = [
  { icon: '🔄', name: 'Loop Invariants', desc: 'A condition that must hold true before and after each loop iteration. Violations cause infinite loops or incorrect termination.', tags: ['while loops', 'for loops', 'termination'] },
  { icon: '📦', name: 'Array Indexing & Bounds', desc: 'Arrays are zero-indexed. Valid indices span [0, length-1]. Accessing outside this range causes runtime exceptions.', tags: ['off-by-one', 'IndexOutOfBounds', 'zero-indexing'] },
  { icon: '📚', name: 'Recursion & Call Stack', desc: 'Recursive functions must have a base case that reduces the problem size. Without it, the stack overflows.', tags: ['base case', 'stack frames', 'stack overflow'] },
  { icon: '🔗', name: 'Reference vs. Value Semantics', desc: 'Primitive types are compared by value; objects are compared by reference (memory address) unless overridden.', tags: ['equality', 'heap', 'pointers'] },
  { icon: '⚠️', name: 'Iterator Invalidation', desc: 'Modifying a collection while iterating it invalidates the iterator\'s internal state, causing skipped elements or crashes.', tags: ['mutation', 'for loops', 'collections'] },
  { icon: '🔢', name: 'Data Types & Type Coercion', desc: 'Operations between incompatible types may silently coerce values, causing precision loss or unexpected results.', tags: ['integer division', 'type casting', 'precision'] },
  { icon: '🛡️', name: 'Null Safety', desc: 'Accessing members of a null/None reference causes NullPointerException. Always validate optional return values.', tags: ['null', 'None', 'defensive coding'] },
  { icon: '⚡', name: 'Operator Precedence', desc: 'Mathematical operators follow strict evaluation order. Incorrect precedence assumptions lead to wrong calculations.', tags: ['PEMDAS', 'parentheses', 'arithmetic'] }
];

// ─── APP STATE ────────────────────────────────────────────────────────────────
let editor = null;
let currentLang = 'python';
let analysisTimer = null;
let currentErrors = [];
let vizModal = { type: null, step: 0 };
let editorDecorations = [];

// ─── MONACO SETUP ─────────────────────────────────────────────────────────────
require(['vs/editor/editor.main'], () => {
  monaco.editor.defineTheme('logicLens', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '475569', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c084fc' },
      { token: 'string', foreground: '34d399' },
      { token: 'number', foreground: '60a5fa' },
      { token: 'function', foreground: '60a5fa' },
    ],
    colors: {
      'editor.background': '#0a1628',
      'editor.foreground': '#f1f5f9',
      'editor.lineHighlightBackground': '#0f1f3d',
      'editorLineNumber.foreground': '#334155',
      'editorLineNumber.activeForeground': '#60a5fa',
      'editor.selectionBackground': '#1e3a5f',
      'editorCursor.foreground': '#3b82f6',
      'editorGutter.background': '#0a1628',
    }
  });

  editor = monaco.editor.create(document.getElementById('monaco-editor-container'), {
    value: SNIPPETS.infinite_loop,
    language: 'python',
    theme: 'logicLens',
    fontSize: 14,
    fontFamily: "'JetBrains Mono', monospace",
    minimap: { enabled: false },
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    padding: { top: 16, bottom: 16 },
    automaticLayout: true,
    wordWrap: 'on',
    glyphMargin: true,
    folding: false,
    lineDecorationsWidth: 8,
  });

  editor.onDidChangeModelContent(() => scheduleAnalysis());
  editor.onDidChangeCursorPosition(e => {
    document.getElementById('line-count').textContent = `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
  });

  scheduleAnalysis();
});

// ─── ANALYSIS ─────────────────────────────────────────────────────────────────
function scheduleAnalysis() {
  clearTimeout(analysisTimer);
  setStatus('analyzing');
  analysisTimer = setTimeout(runAnalysis, 600);
}

async function runAnalysis() {
  if (!editor) return;
  const code = editor.getValue();
  const lines = code.split('\n');
  currentErrors = [];

  // Pick rule set based on active language
  let activeRules = RULES;
  if (currentLang === 'java') activeRules = JAVA_RULES;
  else if (currentLang === 'c') activeRules = C_RULES;

  activeRules.forEach(rule => {
    if (rule.test(code)) {
      currentErrors.push({ ...rule, line: rule.getLine(lines) });
    }
  });

  renderErrors(currentErrors);
  updateDecorations(currentErrors);
  setStatus(currentErrors.length > 0 ? 'error' : 'done');

  // BACKGROUND SYNTAX & COMPILATION CHECK
  const pistonLangs = {
    python: { language: 'python', version: '3.10.0' },
    javascript: { language: 'javascript', version: '18.15.0' },
    c: { language: 'c', version: '10.2.0' },
    cpp: { language: 'c++', version: '10.2.0' },
    java: { language: 'java', version: '15.0.2' }
  };
  
  try {
    const res = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: pistonLangs[currentLang].language,
        version: pistonLangs[currentLang].version,
        files: [{ content: code }]
      })
    });
    const data = await res.json();
    let syntaxErrorMsg = null;
    let syntaxErrorLine = 1;

    // Check for compile errors (C, C++, Java)
    if (data.compile && data.compile.code !== 0) {
      syntaxErrorMsg = data.compile.stderr || data.compile.output;
    } 
    // Check for runtime syntax errors (Python, JS)
    else if (data.run && data.run.code !== 0 && 
              (data.run.stderr.includes('SyntaxError') || 
               data.run.stderr.includes('ReferenceError') || 
               data.run.stderr.includes('NameError') ||
               data.run.stderr.includes('error:') ||
               data.run.stderr.includes('Exception') ||
               data.run.stderr.includes('Traceback'))) {
      syntaxErrorMsg = data.run.stderr;
    }

    if (syntaxErrorMsg) {
      // Attempt to parse line number
      const lineMatch = syntaxErrorMsg.match(/:(\d+):/); // gcc / java
      const lineMatchPy = syntaxErrorMsg.match(/line (\d+)/i); // python
      if (lineMatch) syntaxErrorLine = parseInt(lineMatch[1], 10);
      else if (lineMatchPy) syntaxErrorLine = parseInt(lineMatchPy[1], 10);

      // Clean up description
      const shortDesc = syntaxErrorMsg.split('\n').filter(l => l.trim() !== '').slice(0, 3).join('\n');

      // Add to front of errors list
      currentErrors.unshift({
        id: 'syntax_error',
        severity: 'critical',
        title: 'Compilation / Syntax Error',
        concept: 'Syntax & Compilation',
        conceptIcon: '❌',
        line: syntaxErrorLine,
        description: 'The compiler caught a syntax or runtime error in your code:\n' + shortDesc,
        fix: 'Fix the syntax error to continue logic analysis.\nClick "Run Code" to view the full compiler details.'
      });
      
      renderErrors(currentErrors);
      updateDecorations(currentErrors);
      setStatus('error');
    }
  } catch(e) {
    console.error("Background syntax check failed:", e);
  }
}

function updateDecorations(errors) {
  if (!editor) return;
  const decorations = errors.map(e => ({
    range: new monaco.Range(e.line, 1, e.line, 1),
    options: {
      isWholeLine: true,
      className: e.severity === 'critical' ? 'monaco-error-line' : 'monaco-warn-line',
      glyphMarginClassName: e.severity === 'critical' ? 'monaco-glyph-error' : 'monaco-glyph-warn',
    }
  }));
  editorDecorations = editor.deltaDecorations(editorDecorations, decorations);
}

// ─── RENDER ERRORS ────────────────────────────────────────────────────────────
function renderErrors(errors) {
  const container = document.getElementById('error-cards-container');
  const empty = document.getElementById('empty-state');
  const badge = document.getElementById('error-count-badge');
  container.innerHTML = '';

  if (errors.length === 0) {
    empty.style.display = 'none';
    badge.className = 'summary-badge no-errors';
    badge.textContent = '✅ No Issues';
    container.innerHTML = `<div class="no-errors-state"><div class="no-errors-icon">✅</div><div class="no-errors-title">Looks Clean!</div><div class="no-errors-sub">No logic errors detected. Great work!</div></div>`;
    return;
  }

  empty.style.display = 'none';
  badge.className = 'summary-badge has-errors';
  badge.textContent = `${errors.length} Issue${errors.length > 1 ? 's' : ''} Found`;

  errors.forEach((err, idx) => {
    const card = document.createElement('div');
    card.className = `error-card severity-${err.severity}`;
    card.id = `error-card-${idx}`;
    const chipClass = err.severity === 'critical' ? 'chip-critical' : err.severity === 'warning' ? 'chip-warning' : 'chip-info';
    const hasViz = !!Visualizations[err.id];
    card.innerHTML = `
      <div class="card-top">
        <div class="card-title">${err.title}</div>
        <span class="severity-chip ${chipClass}">${err.severity}</span>
      </div>
      <div class="card-line-ref">⚑ Line ${err.line}</div>
      <div class="card-desc">${err.description}</div>
      <div class="concept-tag"><span>${err.conceptIcon}</span><span>${err.concept}</span></div>
      <div class="card-actions">
        ${hasViz ? `<button class="viz-btn" id="viz-btn-${idx}" onclick="openViz('${err.id}')">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/><path d="M17.5 14v7m-3.5-3.5h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          Visualize
        </button>` : ''}
        <button class="fix-hint-btn" id="hint-btn-${idx}" onclick="toggleHint(${idx})">💡 Fix Hint</button>
      </div>
      <div class="fix-hint-box" id="fix-hint-${idx}">${err.fix}</div>`;
    container.appendChild(card);
  });
}

function toggleHint(idx) {
  const box = document.getElementById(`fix-hint-${idx}`);
  box.classList.toggle('visible');
  const btn = document.getElementById(`hint-btn-${idx}`);
  btn.textContent = box.classList.contains('visible') ? '✕ Hide Hint' : '💡 Fix Hint';
}

// ─── VISUALIZATION MODAL ──────────────────────────────────────────────────────
function openViz(type) {
  const viz = Visualizations[type];
  if (!viz) return;
  vizModal = { type, step: 0 };
  document.getElementById('modal-title').textContent = viz.title;
  document.getElementById('modal-subtitle').textContent = viz.subtitle;
  document.getElementById('viz-modal').classList.add('open');
  renderVizStep();
  document.body.style.overflow = 'hidden';
}

function renderVizStep() {
  const viz = Visualizations[vizModal.type];
  if (!viz) return;
  const total = viz.steps.length;
  const step = vizModal.step;
  document.getElementById('viz-step-indicator').textContent = `Step ${step + 1} of ${total}`;
  document.getElementById('modal-prev-btn').disabled = step === 0;
  document.getElementById('modal-next-btn').disabled = step === total - 1;
  const container = document.getElementById('viz-container');
  viz.render(container, step);
  const expEl = document.getElementById('viz-explanation');
  expEl.innerHTML = viz.explanation[step];
}

document.getElementById('modal-close-btn').onclick = () => {
  document.getElementById('viz-modal').classList.remove('open');
  document.body.style.overflow = '';
};
document.getElementById('viz-modal').onclick = e => {
  if (e.target === document.getElementById('viz-modal')) {
    document.getElementById('viz-modal').classList.remove('open');
    document.body.style.overflow = '';
  }
};
document.getElementById('modal-next-btn').onclick = () => {
  const viz = Visualizations[vizModal.type];
  if (vizModal.step < viz.steps.length - 1) { vizModal.step++; renderVizStep(); }
};
document.getElementById('modal-prev-btn').onclick = () => {
  if (vizModal.step > 0) { vizModal.step--; renderVizStep(); }
};

// ─── LANGUAGE SELECTOR ──────────────────────────────────────────────────────────
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;
    const monacoLangMap = { python: 'python', javascript: 'javascript', cpp: 'cpp', c: 'c', java: 'java' };
    monaco.editor.setModelLanguage(editor.getModel(), monacoLangMap[currentLang] || 'python');
    const filenames = { python: 'student_code.py', javascript: 'student_code.js', cpp: 'student_code.cpp', c: 'student_code.c', java: 'Main.java' };
    document.getElementById('editor-filename').textContent = filenames[currentLang] || 'student_code.py';
    scheduleAnalysis();
  };
});

// ─── SNIPPET LOADER ───────────────────────────────────────────────────────────
document.getElementById('snippet-select').onchange = function () {
  const key = this.value;
  if (!key || !SNIPPETS[key]) return;
  editor.setValue(SNIPPETS[key]);
  // Switch language tab for JS snippet
  if (key === 'reference_equality') {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-lang="javascript"]').classList.add('active');
    monaco.editor.setModelLanguage(editor.getModel(), 'javascript');
    document.getElementById('editor-filename').textContent = 'student_code.js';
  } else {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-lang="python"]').classList.add('active');
    monaco.editor.setModelLanguage(editor.getModel(), 'python');
    document.getElementById('editor-filename').textContent = 'student_code.py';
  }
  this.value = '';
};

// ─── BUTTONS & TABS ─────────────────────────────────────────────────────────────
document.getElementById('run-analysis-btn').onclick = runAnalysis;
document.getElementById('clear-btn').onclick = () => { editor.setValue(''); };

// Tabs logic
document.getElementById('tab-logic').onclick = () => {
  document.getElementById('tab-logic').classList.add('active');
  document.getElementById('tab-terminal').classList.remove('active');
  document.getElementById('pane-logic').classList.add('active');
  document.getElementById('pane-terminal').style.display = 'none';
};
document.getElementById('tab-terminal').onclick = () => {
  document.getElementById('tab-terminal').classList.add('active');
  document.getElementById('tab-logic').classList.remove('active');
  document.getElementById('pane-terminal').style.display = 'block';
  document.getElementById('pane-logic').classList.remove('active');
};

// Piston API Code Execution
document.getElementById('run-code-btn').onclick = async () => {
  if (!editor) return;
  const code = editor.getValue();
  
  // Switch to terminal tab
  document.getElementById('tab-terminal').click();
  
  const statusEl = document.getElementById('terminal-status');
  const outEl = document.getElementById('terminal-output');
  
  statusEl.className = 'term-status running';
  statusEl.textContent = 'Running...';
  outEl.textContent = 'Sending code to execution engine...\n';
  outEl.style.color = '#a7f3d0';
  
  const pistonLangs = {
    python: { language: 'python', version: '3.10.0' },
    javascript: { language: 'javascript', version: '18.15.0' },
    c: { language: 'c', version: '10.2.0' },
    cpp: { language: 'c++', version: '10.2.0' },
    java: { language: 'java', version: '15.0.2' }
  };
  
  const payload = {
    language: pistonLangs[currentLang].language,
    version: pistonLangs[currentLang].version,
    files: [{ content: code }]
  };
  
  try {
    const res = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    
    if (data.compile && data.compile.code !== 0) {
      statusEl.className = 'term-status error';
      statusEl.textContent = 'Compile Error';
      outEl.textContent = data.compile.stderr || data.compile.output;
      outEl.style.color = '#fca5a5';
    } else if (data.run && data.run.code !== 0) {
      statusEl.className = 'term-status error';
      statusEl.textContent = 'Runtime Error';
      outEl.textContent = data.run.stderr || data.run.output;
      outEl.style.color = '#fca5a5';
    } else {
      statusEl.className = 'term-status success';
      statusEl.textContent = 'Success';
      outEl.textContent = data.run.output || 'Code executed successfully with no output.';
      outEl.style.color = '#a7f3d0';
    }
  } catch (err) {
    statusEl.className = 'term-status error';
    statusEl.textContent = 'API Error';
    outEl.textContent = 'Failed to connect to execution engine.\n' + err.message;
    outEl.style.color = '#fca5a5';
  }
};

// ─── STATUS ───────────────────────────────────────────────────────────────────
function setStatus(state) {
  const dot = document.getElementById('status-indicator').querySelector('.status-dot');
  const text = document.getElementById('status-text');
  dot.className = 'status-dot ' + state;
  const msgs = { idle: 'Ready — start typing', analyzing: 'Analyzing…', done: 'Analysis complete ✓', error: 'Issues detected' };
  text.textContent = msgs[state] || 'Ready';
}

// ─── CONCEPTS GRID ────────────────────────────────────────────────────────────
function renderConcepts() {
  const grid = document.getElementById('concepts-grid');
  grid.innerHTML = CS_CONCEPTS.map(c => `
    <div class="concept-card">
      <div class="concept-icon">${c.icon}</div>
      <div class="concept-name">${c.name}</div>
      <div class="concept-desc">${c.desc}</div>
      <div class="concept-tags">${c.tags.map(t => `<span class="ctag">${t}</span>`).join('')}</div>
    </div>`).join('');
}
renderConcepts();

// ─── NAVBAR SCROLL ────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow = window.scrollY > 10 ? '0 4px 30px rgba(0,0,0,0.4)' : 'none';
});

// ─── MONACO STYLES INJECTION ──────────────────────────────────────────────────
const monacoStyles = document.createElement('style');
monacoStyles.textContent = `
  .monaco-error-line { background: rgba(239,68,68,0.06); }
  .monaco-warn-line { background: rgba(245,158,11,0.06); }
  .monaco-glyph-error::before { content: '●'; color: #ef4444; font-size: 12px; }
  .monaco-glyph-warn::before { content: '●'; color: #f59e0b; font-size: 12px; }
`;
document.head.appendChild(monacoStyles);
