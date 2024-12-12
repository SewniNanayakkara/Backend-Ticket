<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="container">
        <h1>Multi-Threaded Producer-Consumer Logic</h1>
        <p>The backend implementation manages core functionalities for handling concurrency and synchronization as vendors (producers) and customers (consumers) interact with a shared ticket pool. This ensures data integrity and efficient operations in a multi-threaded environment.</p>
        <h2>Requirements</h2>
        <h3>Vendor and Customer Threads</h3>
        <ul>
            <li><strong>Vendors (Producers):</strong> Threads that add tickets to the shared TicketPool.</li>
            <li><strong>Customers (Consumers):</strong> Threads that purchase tickets from the TicketPool.</li>
            <li>Implemented as separate multi-threaded classes.</li>
        </ul>
        <h3>Producer-Consumer Synchronization</h3>
        <ul>
            <li>Ensure thread-safe interactions between multiple vendors and customers with the shared TicketPool.</li>
            <li>Use synchronization techniques such as <code>synchronized</code> blocks, <code>ReentrantLock</code>, or other Java concurrency utilities to prevent race conditions.</li>
        </ul>
        <h3>TicketPool Class</h3>
        <ul>
            <li>A shared resource class to manage ticket inventory.</li>
            <li><strong>Data Structure:</strong> Use a thread-safe structure like <code>Collections.synchronizedList</code> or <code>ConcurrentLinkedQueue</code>.</li>
            <li><strong>Methods:</strong>
                <ul>
                    <li><code>addTickets(int count)</code>: Allows vendors to add tickets.</li>
                    <li><code>removeTicket()</code>: Allows customers to purchase tickets.</li>
                </ul>
            </li>
            <li><strong>Capacity Checks:</strong> Enforce a <code>maxTicketCapacity</code> to prevent overflows.</li>
        </ul>
        <h2>Backend Technologies</h2>
        <h3>Core Technologies</h3>
        <ol>
            <li><strong>Java:</strong> Direct implementation using core Java for threading and synchronization. Optional integration with JavaFX for GUI.</li>
            <li><strong>Node.js:</strong> Implement backend logic and expose APIs for a web-based frontend.</li>
            <li><strong>Spring Boot:</strong> Build a robust backend with RESTful endpoints for GUI interactions.</li>
        </ol>
        <h2>Deliverables</h2>
        <ul>
            <li>Multi-threaded producer-consumer implementation with proper synchronization.</li>
            <li>Thread-safe TicketPool class with synchronized methods for adding and removing tickets.</li>
            <li>Backend documentation detailing threading and synchronization mechanisms.</li>
        </ul>
        <h2>Optional Advanced Functionalities (Bonus)</h2>
        <ul>
            <li><strong>Priority Customers:</strong> VIP customer class with higher priority access to tickets, implemented using a priority queue or custom mechanism.</li>
            <li><strong>Dynamic Vendor/Customer Management:</strong> Add or remove vendors and customers dynamically via GUI or CLI.</li>
            <li><strong>Real-Time Analytics Dashboard:</strong> Visualize ticket sales over time using charting libraries.</li>
            <li><strong>Advanced Synchronization:</strong> Use constructs like <code>ReentrantLock</code>, <code>Semaphore</code>, or <code>Condition</code> for fine-grained control.</li>
            <li><strong>Persistence:</strong> Store transaction data in a database (e.g., SQLite) to track sales and customer data.</li>
        </ul>
        <h2>How to Run</h2>
        <ol>
            <li><strong>Java Implementation:</strong> Compile and run the backend logic using the <code>javac</code> and <code>java</code> commands. If using JavaFX, launch the GUI application from the main class.</li>
            <li><strong>Node.js/Spring Boot:</strong> Start the server with <code>node server.js</code> or <code>mvn spring-boot:run</code>. Access APIs through the configured endpoints.</li>
        </ol>
        <h2>Troubleshooting</h2>
        <ul>
            <li><strong>Race Conditions:</strong> Ensure proper use of synchronization mechanisms.</li>
            <li><strong>Deadlocks:</strong> Avoid nested locks and prefer using <code>tryLock</code> with timeouts.</li>
            <li><strong>Performance:</strong> Monitor thread performance and optimize data structures.</li>
        </ul>
        <h2>License</h2>
        <p>This project is open-source and can be modified or redistributed under <a href="LICENSE">MIT License</a>.</p>
    </div>
</body>
</html>

