export const programs = [
  {
    id: 1,
    name: "Find-S Algorithm",
    language: "Python",
    code: `def find_s_algorithm(training_data):
    """
    Find-S Algorithm: Finds the most specific hypothesis
    consistent with positive training examples.
    """
    # Initialize hypothesis with the most specific hypothesis
    hypothesis = ['0'] * (len(training_data[0]) - 1)

    for instance in training_data:
        # Process only positive examples
        if instance[-1] == 'Yes':
            for i in range(len(hypothesis)):
                if hypothesis[i] == '0':
                    # Initialize with the first positive example
                    hypothesis[i] = instance[i]
                elif hypothesis[i] != instance[i]:
                    # Generalize if attributes differ
                    hypothesis[i] = '?'

    return hypothesis

# Training Data: [Sky, AirTemp, Humidity, Wind, Water, Forecast, EnjoySport]
training_data = [
    ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same', 'Yes'],
    ['Sunny', 'Warm', 'High',   'Strong', 'Warm', 'Same', 'Yes'],
    ['Rainy', 'Cold', 'High',   'Strong', 'Warm', 'Change', 'No'],
    ['Sunny', 'Warm', 'High',   'Strong', 'Cool', 'Change', 'Yes'],
]

result = find_s_algorithm(training_data)
print("Final Hypothesis:", result)
`,
  },
  {
    id: 2,
    name: "Bubble Sort",
    language: "C",
    code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    printArray(arr, n);

    bubbleSort(arr, n);

    printf("Sorted array:   ");
    printArray(arr, n);

    return 0;
}
`,
  },
  {
    id: 3,
    name: "Breadth First Search (BFS)",
    language: "Python",
    code: `from collections import deque

def bfs(graph, start):
    """
    Breadth First Search (BFS)
    Explores all neighbors at the current depth before going deeper.
    """
    visited = set()
    queue = deque([start])
    visited.add(start)
    traversal = []

    while queue:
        node = queue.popleft()
        traversal.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return traversal

# Example Graph (Adjacency List)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E'],
}

result = bfs(graph, 'A')
print("BFS Traversal:", result)
`,
  },
  {
    id: 4,
    name: "Depth First Search (DFS)",
    language: "Python",
    code: `def dfs(graph, start, visited=None):
    """
    Depth First Search (DFS)
    Explores as far as possible along each branch before backtracking.
    """
    if visited is None:
        visited = set()

    visited.add(start)
    print(start, end=' ')

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited

# Example Graph (Adjacency List)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E'],
}

print("DFS Traversal: ", end='')
dfs(graph, 'A')
print()
`,
  },
  {
    id: 5,
    name: "Binary Search",
    language: "C",
    code: `#include <stdio.h>

int binarySearch(int arr[], int low, int high, int target) {
    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
            return mid;       // Target found
        else if (arr[mid] < target)
            low = mid + 1;    // Search right half
        else
            high = mid - 1;   // Search left half
    }
    return -1; // Target not found
}

int main() {
    int arr[] = {2, 3, 4, 10, 40, 50, 60};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;

    int result = binarySearch(arr, 0, n - 1, target);

    if (result != -1)
        printf("Element %d found at index %d\\n", target, result);
    else
        printf("Element %d not found in array\\n", target);

    return 0;
}
`,
  },
  {
    id: 6,
    name: "Merge Sort",
    language: "C",
    code: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else               arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];

    free(L);
    free(R);
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);

    mergeSort(arr, 0, n - 1);

    printf("\\nSorted:   ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    return 0;
}
`,
  },
  {
    id: 7,
    name: "Quick Sort",
    language: "Python",
    code: `def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quickSort(arr, low, high):
    """
    Quick Sort Algorithm
    Picks a pivot and partitions the array around it recursively.
    """
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)

arr = [10, 7, 8, 9, 1, 5]
n = len(arr)

print("Original:", arr)
quickSort(arr, 0, n - 1)
print("Sorted:  ", arr)
`,
  },
  {
    id: 8,
    name: "Stack Implementation",
    language: "C",
    code: `#include <stdio.h>
#include <stdlib.h>

#define MAX 100

typedef struct {
    int items[MAX];
    int top;
} Stack;

void init(Stack *s)    { s->top = -1; }
int  isEmpty(Stack *s) { return s->top == -1; }
int  isFull(Stack *s)  { return s->top == MAX - 1; }

void push(Stack *s, int value) {
    if (isFull(s)) { printf("Stack Overflow\\n"); return; }
    s->items[++(s->top)] = value;
    printf("Pushed: %d\\n", value);
}

int pop(Stack *s) {
    if (isEmpty(s)) { printf("Stack Underflow\\n"); return -1; }
    return s->items[(s->top)--];
}

int peek(Stack *s) {
    if (isEmpty(s)) { printf("Stack is empty\\n"); return -1; }
    return s->items[s->top];
}

int main() {
    Stack s;
    init(&s);

    push(&s, 10);
    push(&s, 20);
    push(&s, 30);

    printf("Top element: %d\\n", peek(&s));
    printf("Popped: %d\\n", pop(&s));
    printf("Popped: %d\\n", pop(&s));
    printf("Top after pops: %d\\n", peek(&s));

    return 0;
}
`,
  },
  {
    id: 9,
    name: "Queue Implementation",
    language: "C",
    code: `#include <stdio.h>
#define MAX 100

typedef struct {
    int items[MAX];
    int front, rear;
} Queue;

void init(Queue *q)     { q->front = -1; q->rear = -1; }
int  isEmpty(Queue *q)  { return q->front == -1; }
int  isFull(Queue *q)   { return q->rear == MAX - 1; }

void enqueue(Queue *q, int value) {
    if (isFull(q)) { printf("Queue is full\\n"); return; }
    if (isEmpty(q)) q->front = 0;
    q->items[++(q->rear)] = value;
    printf("Enqueued: %d\\n", value);
}

int dequeue(Queue *q) {
    if (isEmpty(q)) { printf("Queue is empty\\n"); return -1; }
    int val = q->items[q->front];
    if (q->front == q->rear) init(q);
    else q->front++;
    return val;
}

int main() {
    Queue q;
    init(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);

    printf("Dequeued: %d\\n", dequeue(&q));
    printf("Dequeued: %d\\n", dequeue(&q));

    return 0;
}
`,
  },
  {
    id: 10,
    name: "Linear Regression",
    language: "Python",
    code: `import numpy as np

def linear_regression(X, y):
    """
    Simple Linear Regression using the Normal Equation:
    theta = (X^T * X)^-1 * X^T * y
    """
    # Add bias term (column of 1s)
    X_b = np.c_[np.ones((len(X), 1)), X]

    # Normal Equation
    theta = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
    return theta

def predict(X, theta):
    X_b = np.c_[np.ones((len(X), 1)), X]
    return X_b @ theta

# Sample Data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2.1, 3.9, 6.2, 7.8, 10.1])

theta = linear_regression(X, y)
print(f"Intercept (theta0): {theta[0]:.4f}")
print(f"Slope     (theta1): {theta[1]:.4f}")

X_test = np.array([[6], [7]])
predictions = predict(X_test, theta)
print(f"Predictions for [6, 7]: {predictions}")
`,
  },
  {
    id: 11,
    name: "K-Nearest Neighbors (KNN)",
    language: "Python",
    code: `import numpy as np
from collections import Counter

def euclidean_distance(p1, p2):
    return np.sqrt(np.sum((np.array(p1) - np.array(p2)) ** 2))

def knn_predict(X_train, y_train, X_test, k=3):
    """
    K-Nearest Neighbors Classifier
    Predicts the class of each test point based on k nearest training points.
    """
    predictions = []

    for test_point in X_test:
        # Calculate distances from test point to all training points
        distances = [(euclidean_distance(test_point, x), y)
                     for x, y in zip(X_train, y_train)]

        # Sort by distance and pick k nearest
        distances.sort(key=lambda x: x[0])
        k_nearest = [label for _, label in distances[:k]]

        # Majority vote
        prediction = Counter(k_nearest).most_common(1)[0][0]
        predictions.append(prediction)

    return predictions

# Training Data
X_train = [[1, 2], [2, 3], [3, 1], [6, 5], [7, 8], [8, 6]]
y_train = ['A', 'A', 'A', 'B', 'B', 'B']

# Test Data
X_test = [[4, 4], [7, 7]]

result = knn_predict(X_train, y_train, X_test, k=3)
print("Predictions:", result)
`,
  },
  {
    id: 12,
    name: "Linked List",
    language: "C",
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* createNode(int data) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void insertEnd(Node **head, int data) {
    Node *newNode = createNode(data);
    if (*head == NULL) { *head = newNode; return; }
    Node *temp = *head;
    while (temp->next) temp = temp->next;
    temp->next = newNode;
}

void deleteNode(Node **head, int key) {
    Node *temp = *head, *prev = NULL;
    if (temp && temp->data == key) { *head = temp->next; free(temp); return; }
    while (temp && temp->data != key) { prev = temp; temp = temp->next; }
    if (!temp) return;
    prev->next = temp->next;
    free(temp);
}

void printList(Node *head) {
    while (head) { printf("%d -> ", head->data); head = head->next; }
    printf("NULL\\n");
}

int main() {
    Node *head = NULL;
    insertEnd(&head, 10);
    insertEnd(&head, 20);
    insertEnd(&head, 30);
    insertEnd(&head, 40);

    printf("List: "); printList(head);
    deleteNode(&head, 20);
    printf("After deleting 20: "); printList(head);

    return 0;
}
`,
  },
];
