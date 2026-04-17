import type * as MonacoT from "monaco-editor";

type Monaco = typeof MonacoT;

interface SnippetDef {
  label: string;
  detail: string;
  body: string;
  documentation?: string;
}

const PYTHON_SNIPPETS: SnippetDef[] = [
  {
    label: "for",
    detail: "for i in range(n)",
    body: "for ${1:i} in range(${2:n}):\n\t${0:pass}",
  },
  {
    label: "forenum",
    detail: "for i, x in enumerate(arr)",
    body: "for ${1:i}, ${2:x} in enumerate(${3:arr}):\n\t${0:pass}",
  },
  {
    label: "forin",
    detail: "for x in arr",
    body: "for ${1:x} in ${2:arr}:\n\t${0:pass}",
  },
  {
    label: "while",
    detail: "while condition",
    body: "while ${1:condition}:\n\t${0:pass}",
  },
  {
    label: "whiletwo",
    detail: "two-pointer while loop",
    body: "l, r = 0, len(${1:nums}) - 1\nwhile l < r:\n\t${0:pass}",
  },
  {
    label: "ifmain",
    detail: "if __name__ == '__main__':",
    body: 'if __name__ == "__main__":\n\t${0:pass}',
  },
  {
    label: "dd",
    detail: "defaultdict(list)",
    body: "${1:groups} = defaultdict(${2:list})",
    documentation: "Requires: from collections import defaultdict",
  },
  {
    label: "ddint",
    detail: "defaultdict(int) counter",
    body: "${1:count} = defaultdict(int)",
  },
  {
    label: "ctr",
    detail: "Counter(iterable)",
    body: "${1:count} = Counter(${2:nums})",
    documentation: "Requires: from collections import Counter",
  },
  {
    label: "dq",
    detail: "deque([...])",
    body: "${1:queue} = deque([${2}])",
    documentation: "Requires: from collections import deque",
  },
  {
    label: "heap",
    detail: "heap push/pop",
    body: "${1:heap} = []\nheapq.heappush(${1:heap}, ${2:val})\n${3:top} = heapq.heappop(${1:heap})",
    documentation: "Requires: import heapq",
  },
  {
    label: "bfs",
    detail: "BFS template (grid)",
    body: [
      "from collections import deque",
      "queue = deque([(${1:start})])",
      "visited = {(${1:start})}",
      "while queue:",
      "\t${2:node} = queue.popleft()",
      "\tfor ${3:nxt} in ${4:neighbors(${2:node})}:",
      "\t\tif ${3:nxt} not in visited:",
      "\t\t\tvisited.add(${3:nxt})",
      "\t\t\tqueue.append(${3:nxt})",
      "\t\t\t$0",
    ].join("\n"),
  },
  {
    label: "dfs",
    detail: "DFS recursive template",
    body: [
      "def dfs(${1:node}):",
      "\tif ${2:not ${1:node}}:",
      "\t\treturn",
      "\t${3:# process}",
      "\tfor ${4:nxt} in ${5:neighbors(${1:node})}:",
      "\t\tdfs(${4:nxt})",
      "",
      "dfs(${6:start})",
      "$0",
    ].join("\n"),
  },
  {
    label: "binsearch",
    detail: "Binary search template",
    body: [
      "l, r = 0, len(${1:nums}) - 1",
      "while l <= r:",
      "\tmid = (l + r) // 2",
      "\tif ${1:nums}[mid] == ${2:target}:",
      "\t\treturn mid",
      "\telif ${1:nums}[mid] < ${2:target}:",
      "\t\tl = mid + 1",
      "\telse:",
      "\t\tr = mid - 1",
      "return -1",
    ].join("\n"),
  },
  {
    label: "treenode",
    detail: "TreeNode class",
    body: [
      "class TreeNode:",
      "\tdef __init__(self, val=0, left=None, right=None):",
      "\t\tself.val = val",
      "\t\tself.left = left",
      "\t\tself.right = right",
    ].join("\n"),
  },
  {
    label: "listnode",
    detail: "ListNode class",
    body: [
      "class ListNode:",
      "\tdef __init__(self, val=0, next=None):",
      "\t\tself.val = val",
      "\t\tself.next = next",
    ].join("\n"),
  },
  {
    label: "memo",
    detail: "@lru_cache memoization",
    body: "@lru_cache(maxsize=None)\ndef ${1:helper}(${2:args}):\n\t$0",
    documentation: "Requires: from functools import lru_cache",
  },
  {
    label: "imp",
    detail: "Common LeetCode imports",
    body: [
      "from collections import defaultdict, Counter, deque",
      "from heapq import heappush, heappop, heapify",
      "from functools import lru_cache",
      "$0",
    ].join("\n"),
  },
];

const JS_SNIPPETS: SnippetDef[] = [
  {
    label: "for",
    detail: "for (let i = 0; i < n; i++)",
    body: "for (let ${1:i} = 0; ${1:i} < ${2:arr}.length; ${1:i}++) {\n\t$0\n}",
  },
  {
    label: "forof",
    detail: "for (const x of arr)",
    body: "for (const ${1:x} of ${2:arr}) {\n\t$0\n}",
  },
  {
    label: "forin",
    detail: "for (const k in obj)",
    body: "for (const ${1:key} in ${2:obj}) {\n\t$0\n}",
  },
  {
    label: "forent",
    detail: "for (const [k, v] of Object.entries)",
    body: "for (const [${1:key}, ${2:val}] of Object.entries(${3:obj})) {\n\t$0\n}",
  },
  {
    label: "while",
    detail: "while (condition)",
    body: "while (${1:condition}) {\n\t$0\n}",
  },
  {
    label: "whiletwo",
    detail: "two-pointer while loop",
    body: "let l = 0, r = ${1:nums}.length - 1;\nwhile (l < r) {\n\t$0\n}",
  },
  {
    label: "map",
    detail: "const m = new Map()",
    body: "const ${1:map} = new Map();",
  },
  {
    label: "set",
    detail: "const s = new Set()",
    body: "const ${1:set} = new Set(${2});",
  },
  {
    label: "bfs",
    detail: "BFS template",
    body: [
      "const queue = [${1:start}];",
      "const visited = new Set([${1:start}]);",
      "while (queue.length) {",
      "\tconst ${2:node} = queue.shift();",
      "\tfor (const ${3:nxt} of ${4:neighbors(${2:node})}) {",
      "\t\tif (!visited.has(${3:nxt})) {",
      "\t\t\tvisited.add(${3:nxt});",
      "\t\t\tqueue.push(${3:nxt});",
      "\t\t\t$0",
      "\t\t}",
      "\t}",
      "}",
    ].join("\n"),
  },
  {
    label: "dfs",
    detail: "DFS recursive template",
    body: [
      "const dfs = (${1:node}) => {",
      "\tif (!${1:node}) return;",
      "\t${2:// process}",
      "\tfor (const ${3:nxt} of ${4:neighbors(${1:node})}) {",
      "\t\tdfs(${3:nxt});",
      "\t}",
      "};",
      "dfs(${5:start});",
      "$0",
    ].join("\n"),
  },
  {
    label: "binsearch",
    detail: "Binary search template",
    body: [
      "let l = 0, r = ${1:nums}.length - 1;",
      "while (l <= r) {",
      "\tconst mid = (l + r) >> 1;",
      "\tif (${1:nums}[mid] === ${2:target}) return mid;",
      "\tif (${1:nums}[mid] < ${2:target}) l = mid + 1;",
      "\telse r = mid - 1;",
      "}",
      "return -1;",
    ].join("\n"),
  },
  {
    label: "treenode",
    detail: "TreeNode constructor",
    body: "function TreeNode(val, left, right) {\n\tthis.val = val ?? 0;\n\tthis.left = left ?? null;\n\tthis.right = right ?? null;\n}",
  },
  {
    label: "listnode",
    detail: "ListNode constructor",
    body: "function ListNode(val, next) {\n\tthis.val = val ?? 0;\n\tthis.next = next ?? null;\n}",
  },
  {
    label: "memo",
    detail: "Memoization with Map",
    body: [
      "const memo = new Map();",
      "const ${1:helper} = (${2:key}) => {",
      "\tif (memo.has(${2:key})) return memo.get(${2:key});",
      "\t$0",
      "\tmemo.set(${2:key}, result);",
      "\treturn result;",
      "};",
    ].join("\n"),
  },
];

function registerSnippets(
  monaco: Monaco,
  language: "python" | "javascript",
  snippets: SnippetDef[]
) {
  return monaco.languages.registerCompletionItemProvider(language, {
    triggerCharacters: [],
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions = snippets.map((s) => ({
        label: s.label,
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: s.body,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: s.detail,
        documentation: s.documentation,
        range,
      }));
      return { suggestions };
    },
  });
}

let registered = false;

export function registerEditorCompletions(monaco: Monaco) {
  if (registered) return;
  registered = true;
  registerSnippets(monaco, "python", PYTHON_SNIPPETS);
  registerSnippets(monaco, "javascript", JS_SNIPPETS);
}
