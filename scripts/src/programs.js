export const programs = [
    {
        id: 1,
        title: "Program-1",
        code: `
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <omp.h>

// Function to merge two sorted subarrays
void merge(int arr[], int left, int mid, int right)
{
    int i, j, k;
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temporary arrays
    int *L = (int *)malloc(n1 * sizeof(int));
    int *R = (int *)malloc(n2 * sizeof(int));

    // Copy data to temporary arrays L[] and R[]
    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];

    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    // Merge the temporary arrays
    i = 0;
    j = 0;
    k = left;

    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k] = L[i];
            i++;
        }
        else
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements of L[]
    while (i < n1)
    {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy remaining elements of R[]
    while (j < n2)
    {
        arr[k] = R[j];
        j++;
        k++;
    }

    free(L);
    free(R);
}

// Sequential Merge Sort
void sequentialMergeSort(int arr[], int left, int right)
{
    if (left < right)
    {
        int mid = left + (right - left) / 2;

        sequentialMergeSort(arr, left, mid);
        sequentialMergeSort(arr, mid + 1, right);

        merge(arr, left, mid, right);
    }
}

// Parallel Merge Sort using OpenMP sections
void parallelMergeSort(int arr[], int left, int right)
{
    if (left < right)
    {
        int mid = left + (right - left) / 2;

        #pragma omp parallel sections
        {
            #pragma omp section
            {
                parallelMergeSort(arr, left, mid);
            }

            #pragma omp section
            {
                parallelMergeSort(arr, mid + 1, right);
            }
        }

        merge(arr, left, mid, right);
    }
}

// Function to print an array
void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }

    printf("\n");
}

int main()
{
    int n;

    printf("Enter the number of elements: ");
    scanf("%d", &n);

    int *arr_seq = (int *)malloc(n * sizeof(int));
    int *arr_par = (int *)malloc(n * sizeof(int));

    // Initialize arrays with random values
    srand(time(NULL));

    for (int i = 0; i < n; i++)
    {
        arr_seq[i] = rand() % 1000;
        arr_par[i] = arr_seq[i];
    }

    printf("Original array (first few elements): ");

    for (int i = 0; i < (n > 10 ? 10 : n); i++)
    {
        printf("%d ", arr_seq[i]);
    }

    printf("\n");

    // Sequential Merge Sort execution time
    double start_time_seq = omp_get_wtime();

    sequentialMergeSort(arr_seq, 0, n - 1);

    double end_time_seq = omp_get_wtime();

    printf("Sequential Mergesort Time: %f seconds\n",
           end_time_seq - start_time_seq);

    // Parallel Merge Sort execution time
    double start_time_par = omp_get_wtime();

    parallelMergeSort(arr_par, 0, n - 1);

    double end_time_par = omp_get_wtime();

    printf("Parallel Mergesort Time: %f seconds\n",
           end_time_par - start_time_par);

    printf("Sorted array (first few elements) after parallel sort: ");

    for (int i = 0; i < (n > 10 ? 10 : n); i++)
    {
        printf("%d ", arr_par[i]);
    }

    printf("\n");

    free(arr_seq);
    free(arr_par);

    return 0;
}
Execution
gcc -fopenmp Pgm1.c -o Pgm1
./Pgm1
`
    },
    {
        id: 2,
        title: "Program-2",
        code: `
#include <stdio.h>
#include <omp.h>
#include <stdlib.h>
int main() {
 int num_iterations;
 printf("Enter the number of iterations: ");
 scanf("%d", &num_iterations);
 #pragma omp parallel num_threads(omp_get_max_threads())
 {
 int thread_id = omp_get_thread_num();
 #pragma omp for schedule(static, 2)
 for (int i = 0; i < num_iterations; i++) {
 printf("Thread %d: Iteration %d\n", thread_id, i);
 }
 }
 return 0;
}
Execution
gcc -fopenmp pgm2.c -o pgm2
./pgm2`
    },
    {
        id: 3,
        title: "Program-3",
        code: `
#include <stdio.h>
#include <stdlib.h>
#include <omp.h>
// Recursive function to compute Fibonacci numbers using OpenMP tasks
int fib(int n) {
 int x, y;
 if (n < 2)
 return n;
 #pragma omp task shared(x)
 x = fib(n - 1);
 #pragma omp task shared(y)
 y = fib(n - 2);
 #pragma omp taskwait
 return x + y;
}
int main() {
 int n;
 printf("Enter number of Fibonacci terms to calculate: ");
 scanf("%d", &n);
 printf("Fibonacci series up to %d terms:\n", n);
 #pragma omp parallel
 {
 #pragma omp single
 {
 for (int i = 0; i < n; i++) {
 int result;
 #pragma omp task shared(result)
 {
 result = fib(i);
 #pragma omp critical
 {
 printf("Fib(%d) = %d\n", i, result);
 }
 }
 }
 }
 }
 return 0;
}
Execution
gcc -fopenmp pgm3.c -o pgm3
./pgm3
`
    },
    {
        id: 4,
        title: "Program-4",
        code: `
#include <stdio.h>
#include <stdlib.h>
#include <omp.h>
#include <time.h>
#include <math.h>
int is_prime(int n) {
 if (n <= 1) return 0;
 for (int i = 2; i * i <= n; i++) {
 if (n % i == 0) return 0;
 }
 return 1;
}
int main() {
 int n;
 printf("Enter the value of n: ");
 scanf("%d", &n);
 // Serial execution
 clock_t start_serial = clock();
 int serial_count = 0;
 for (int i = 2; i <= n; i++) {
 if (is_prime(i)) {
 serial_count++;
 }
 }
 clock_t end_serial = clock();
 double time_serial = (double)(end_serial - start_serial) / CLOCKS_PER_SEC;
 // Parallel execution
 clock_t start_parallel = clock();
 int parallel_count = 0;
 #pragma omp parallel for reduction(+:parallel_count)
 for (int i = 2; i <= n; i++) {
 if (is_prime(i)) {
 parallel_count++;
 }
 }
 clock_t end_parallel = clock();
 double time_parallel = (double)(end_parallel - start_parallel) / CLOCKS_PER_SEC;
 printf("Serial execution time: %f seconds\n", time_serial);
 printf("Parallel execution time: %f seconds\n", time_parallel);
 printf("Number of primes found (serial): %d\n", serial_count);
 printf("Number of primes found (parallel): %d\n", parallel_count);
 return 0;
}
Execution
gcc -fopenmp pgm4.c -o pgm4
./pgm4
    `
    },
    {
        id: 5,
        title: "Program-5",
        code: `
#include <mpi.h>
#include <stdio.h>
#include <string.h>
int main(int argc, char** argv) {
 int rank, size;
 const int MAX_LEN = 100;
 char message[MAX_LEN];
 // Initialize the MPI environment
 MPI_Init(&argc, &argv);
 // Get the number of processes
 MPI_Comm_size(MPI_COMM_WORLD, &size);
 // Get the rank of the process
 MPI_Comm_rank(MPI_COMM_WORLD, &rank);
 if (size < 2) {
 if (rank == 0) {
 printf("This program requires at least two processes.\n");
 }
 MPI_Finalize();
 return 0;
 }
 if (rank == 0) {
 // Process 0 sends a message to process 1
 strcpy(message, "Hello from process 0!");
 MPI_Send(message, strlen(message) + 1, MPI_CHAR, 1, 0, MPI_COMM_WORLD);
 printf("Process 0 sent message: %s\n", message);
 } else if (rank == 1) {
 // Process 1 receives the message from process 0
 MPI_Recv(message, MAX_LEN, MPI_CHAR, 0, 0, MPI_COMM_WORLD,
MPI_STATUS_IGNORE);
 printf("Process 1 received message: %s\n", message);
 }
 // Finalize the MPI environment
 MPI_Finalize();
 return 0;
}
Note: install mpi
sudo apt install -y openmpi-bin libopenmpi-dev
Execution steps
mpicc -o 5 5.c
mpirun -np 2 ./5
    `
    },
    {
        id: 6,
        title: "Program-6",
        code: `
#include <mpi.h>
#include <stdio.h>
int main(int argc, char** argv) {
 int rank, size;
 int send_data, recv_data;
 MPI_Init(&argc, &argv);
 MPI_Comm_rank(MPI_COMM_WORLD, &rank);
 MPI_Comm_size(MPI_COMM_WORLD, &size);
 if (size < 2) {
 if (rank == 0) {
 printf("This program needs at least 2 processes.\n");
 }
 MPI_Finalize();
 return 0;
 }
 send_data = rank;
 // Both processes send first — leads to deadlock
 if (rank == 0) {
 MPI_Send(&send_data, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
 MPI_Recv(&recv_data, 1, MPI_INT, 1, 0, MPI_COMM_WORLD,
MPI_STATUS_IGNORE);
 } else if (rank == 1) {
 MPI_Send(&send_data, 1, MPI_INT, 0, 0, MPI_COMM_WORLD);
 MPI_Recv(&recv_data, 1, MPI_INT, 0, 0, MPI_COMM_WORLD,
MPI_STATUS_IGNORE);
 }
 printf("Process %d received data %d\n", rank, recv_data);
 MPI_Finalize();
 return 0;
}
Note: install mpi
sudo apt install -y openmpi-bin libopenmpi-dev
Execution steps
mpicc -o 6 6.c
mpirun -np 2 ./6
`
    },
    {
        id: 7,
        title: "Program-7",
        code: `
#include <mpi.h>
#include <stdio.h>
int main(int argc, char** argv) {
int rank, size;
int data;
// Initialize the MPI environment
MPI_Init(&argc, &argv);
// Get the rank and size
MPI_Comm_rank(MPI_COMM_WORLD, &rank);
MPI_Comm_size(MPI_COMM_WORLD, &size);
// Only the root process (rank 0) sets the data
if (rank == 0) {
data = 2025;
printf("Process 0 is broadcasting data = %d\n", data);
}
// Broadcast data from root (rank 0) to all processes
MPI_Bcast(&data, 1, MPI_INT, 0, MPI_COMM_WORLD);
// All processes print the received data
printf("Process %d received data = %d\n", rank, data);
// Finalize the MPI environment
MPI_Finalize();
return 0;
}
Note: install mpi
sudo apt install -y openmpi-bin libopenmpi-dev
Execution steps
mpicc -o 7 7.c
mpirun -np 4 ./7
    `
    },
    {
        id: 8,
        title: "Program-8",
        code: `
#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv)
{
    int rank, size;
    const int ROOT = 0;

    int send_data[8];       // Array to be scattered (only used by ROOT)
    int recv_data;          // Each process receives one int
    int gathered_data[8];   // Array to gather data back (only used by ROOT)

    MPI_Init(&argc, &argv);  // Initialize MPI

    MPI_Comm_rank(MPI_COMM_WORLD, &rank);  // Get current process rank
    MPI_Comm_size(MPI_COMM_WORLD, &size);  // Get total number of processes

    if (size != 8)
    {
        if (rank == ROOT)
        {
            printf("Please run this program with 8 processes.\n");
        }

        MPI_Finalize();
        return 0;
    }

    // ROOT initializes the data to be scattered
    if (rank == ROOT)
    {
        for (int i = 0; i < 8; i++)
        {
            send_data[i] = i * 10;  // Example data: 0, 10, 20, ..., 70
        }

        printf("Process %d: Data to scatter: ", ROOT);

        for (int i = 0; i < 8; i++)
        {
            printf("%d ", send_data[i]);
        }

        printf("\n");
    }

    // Scatter: send one element of send_data to each process
    MPI_Scatter(send_data, 1, MPI_INT, &recv_data, 1, MPI_INT,
                ROOT, MPI_COMM_WORLD);

    // Each process does some work (e.g., multiply by 2)
    recv_data *= 2;

    // Gather: collect all processed data back to ROOT
    MPI_Gather(&recv_data, 1, MPI_INT, gathered_data, 1, MPI_INT,
               ROOT, MPI_COMM_WORLD);

    // ROOT prints the gathered results
    if (rank == ROOT)
    {
        printf("Process %d: Gathered results: ", ROOT);

        for (int i = 0; i < 8; i++)
        {
            printf("%d ", gathered_data[i]);
        }

        printf("\n");
    }

    MPI_Finalize();
    return 0;
}

Note: Install MPI

sudo apt install -y openmpi-bin libopenmpi-dev

Execution Steps

Step 1: Compile the program

mpicc -o 8 8.c

Step 2: Run the program with 8 processes

mpirun -np 8 ./8
    `
    },
    {
        id: 9,
        title: "Program-9",
        code: `
#include <mpi.h>
#include <stdio.h>
int main(int argc, char** argv) {
 int rank, size;
 int local_value;
 int result;
 MPI_Init(&argc, &argv); // Initialize MPI
 MPI_Comm_rank(MPI_COMM_WORLD, &rank); // Get current process rank
 MPI_Comm_size(MPI_COMM_WORLD, &size); // Get number of processes
 // Each process sets its local value to rank + 1
 local_value = rank + 1;
 if (rank == 0) {
 printf("Each process contributes its rank + 1 to the reductions.\n");
 }
 // ---------- MPI_Reduce (Result only at root) ----------
 if (rank == 0) printf("\nUsing MPI_Reduce (results only at root):\n");
 // SUM
 MPI_Reduce(&local_value, &result, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);
 if (rank == 0) printf("SUM: %d\n", result);
 // PRODUCT
 MPI_Reduce(&local_value, &result, 1, MPI_INT, MPI_PROD, 0, MPI_COMM_WORLD);
 if (rank == 0) printf("PRODUCT: %d\n", result);
 // MAX
 MPI_Reduce(&local_value, &result, 1, MPI_INT, MPI_MAX, 0, MPI_COMM_WORLD);
 if (rank == 0) printf("MAX: %d\n", result);
 // MIN
 MPI_Reduce(&local_value, &result, 1, MPI_INT, MPI_MIN, 0, MPI_COMM_WORLD);
 if (rank == 0) printf("MIN: %d\n", result);
 // ---------- MPI_Allreduce (Result at all processes) ----------
 if (rank == 0) printf("\nUsing MPI_Allreduce (results at all processes):\n");
 // SUM
 MPI_Allreduce(&local_value, &result, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
 printf("Process %d: SUM = %d\n", rank, result);
 // PRODUCT
 MPI_Allreduce(&local_value, &result, 1, MPI_INT, MPI_PROD, MPI_COMM_WORLD);
 printf("Process %d: PRODUCT = %d\n", rank, result);
 // MAX
 MPI_Allreduce(&local_value, &result, 1, MPI_INT, MPI_MAX, MPI_COMM_WORLD);
 printf("Process %d: MAX = %d\n", rank, result);
 // MIN
 MPI_Allreduce(&local_value, &result, 1, MPI_INT, MPI_MIN, MPI_COMM_WORLD);
 printf("Process %d: MIN = %d\n", rank, result);
 MPI_Finalize();
 return 0;
}
Note: install mpi
sudo apt install -y openmpi-bin libopenmpi-dev
Execution steps
mpicc -o 9 9.c
mpirun -np 9 ./9

 
    `
    },
    {
        id: 10,
        title: "Program-10",
        code: ``
    }
];