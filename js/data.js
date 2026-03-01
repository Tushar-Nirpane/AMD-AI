// ============================================================
// LearnAI – Course & Community Data
// ============================================================

const PROVIDERS = {
  coursera:   { name: 'Coursera',        color: '#0056d2', emoji: '🎓' },
  edx:        { name: 'edX',             color: '#02262b', emoji: '📘' },
  deepai:     { name: 'DeepLearning.AI', color: '#8b5cf6', emoji: '🧠' },
  udacity:    { name: 'Udacity',         color: '#02b3e4', emoji: '🚀' },
  fastai:     { name: 'Fast.ai',         color: '#f97316', emoji: '⚡' },
  linkedin:   { name: 'LinkedIn',        color: '#0a66c2', emoji: '💼' },
  huggingface:{ name: 'Hugging Face',    color: '#ffd21e', emoji: '🤗' },
  google:     { name: 'Google',          color: '#4285f4', emoji: '🔵' },
  openai:     { name: 'OpenAI',          color: '#10a37f', emoji: '🟢' },
};

const COURSES = [
  {
    id: 1,
    title: 'Deep Learning Specialization',
    provider: 'deepai',
    domains: ['dl', 'ml'],
    level: 'intermediate',
    coding: 'intermediate-coding',
    instructor: 'industry',
    projects: true,
    cert: ['verified', 'professional'],
    rating: 4.9,
    ratingCount: '142K',
    price: 'Paid',
    duration: '3 months',
    emoji: '🧠',
    bg: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
    tags: ['Neural Networks', 'Python', 'TensorFlow'],
    tagType: ['', '', 'tag-green']
  },
  {
    id: 2,
    title: 'Generative AI with Large Language Models',
    provider: 'deepai',
    domains: ['genai', 'nlp'],
    level: 'intermediate',
    coding: 'intermediate-coding',
    instructor: 'industry',
    projects: true,
    cert: ['verified'],
    rating: 4.8,
    ratingCount: '89K',
    price: 'Paid',
    duration: '3 weeks',
    emoji: '🤖',
    bg: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
    tags: ['LLMs', 'Generative AI', 'Python'],
    tagType: ['', 'tag-yellow', '']
  },
  {
    id: 3,
    title: 'Machine Learning Specialization',
    provider: 'coursera',
    domains: ['ml'],
    level: 'beginner',
    coding: 'basic',
    instructor: 'academia',
    projects: true,
    cert: ['verified', 'university-credit'],
    rating: 4.9,
    ratingCount: '210K',
    price: 'Paid',
    duration: '2 months',
    emoji: '📊',
    bg: 'linear-gradient(135deg,#0056d2,#0284c7)',
    tags: ['ML', 'Python', 'Beginner'],
    tagType: ['', '', 'tag-green']
  },
  {
    id: 4,
    title: 'Practical Deep Learning for Coders',
    provider: 'fastai',
    domains: ['dl', 'cv', 'nlp'],
    level: 'intermediate',
    coding: 'intermediate-coding',
    instructor: 'industry',
    projects: true,
    cert: [],
    rating: 4.8,
    ratingCount: '45K',
    price: 'Free',
    duration: '14 weeks',
    emoji: '⚡',
    bg: 'linear-gradient(135deg,#f97316,#ef4444)',
    tags: ['PyTorch', 'Free', 'Projects'],
    tagType: ['', 'tag-green', 'tag-yellow']
  },
  {
    id: 5,
    title: 'Natural Language Processing with Transformers',
    provider: 'huggingface',
    domains: ['nlp', 'genai'],
    level: 'advanced',
    coding: 'advanced-coding',
    instructor: 'industry',
    projects: true,
    cert: ['verified'],
    rating: 4.7,
    ratingCount: '38K',
    price: 'Free',
    duration: '8 weeks',
    emoji: '🤗',
    bg: 'linear-gradient(135deg,#ffd21e,#f97316)',
    tags: ['Transformers', 'NLP', 'Hugging Face'],
    tagType: ['tag-yellow', '', '']
  },
  {
    id: 6,
    title: 'AI for Everyone',
    provider: 'coursera',
    domains: ['aibiz', 'ml'],
    level: 'beginner',
    coding: 'none',
    instructor: 'industry',
    projects: false,
    cert: ['verified', 'free-audit'],
    rating: 4.8,
    ratingCount: '305K',
    price: 'Free Audit',
    duration: '4 weeks',
    emoji: '🌍',
    bg: 'linear-gradient(135deg,#0056d2,#22d3ee)',
    tags: ['No Coding', 'Beginner', 'Business'],
    tagType: ['tag-green', 'tag-green', '']
  },
  {
    id: 7,
    title: 'Computer Vision Nanodegree',
    provider: 'udacity',
    domains: ['cv', 'dl'],
    level: 'advanced',
    coding: 'advanced-coding',
    instructor: 'industry',
    projects: true,
    cert: ['professional'],
    rating: 4.6,
    ratingCount: '18K',
    price: 'Paid',
    duration: '4 months',
    emoji: '👁️',
    bg: 'linear-gradient(135deg,#02b3e4,#0284c7)',
    tags: ['Computer Vision', 'CNN', 'Projects'],
    tagType: ['', '', 'tag-yellow']
  },
  {
    id: 8,
    title: 'MLOps Specialization',
    provider: 'deepai',
    domains: ['mlops'],
    level: 'advanced',
    coding: 'advanced-coding',
    instructor: 'industry',
    projects: true,
    cert: ['professional'],
    rating: 4.7,
    ratingCount: '24K',
    price: 'Paid',
    duration: '4 months',
    emoji: '⚙️',
    bg: 'linear-gradient(135deg,#6366f1,#4f46e5)',
    tags: ['MLOps', 'Docker', 'CI/CD'],
    tagType: ['', '', '']
  },
  {
    id: 9,
    title: 'Introduction to Machine Learning with Python',
    provider: 'edx',
    domains: ['ml'],
    level: 'beginner',
    coding: 'basic',
    instructor: 'academia',
    projects: false,
    cert: ['university-credit', 'verified'],
    rating: 4.5,
    ratingCount: '67K',
    price: 'Free Audit',
    duration: '6 weeks',
    emoji: '🐍',
    bg: 'linear-gradient(135deg,#02262b,#047857)',
    tags: ['Python', 'scikit-learn', 'University'],
    tagType: ['', '', 'tag-yellow']
  },
  {
    id: 10,
    title: 'Building AI-Powered Apps with GPT-4',
    provider: 'openai',
    domains: ['genai', 'nlp'],
    level: 'intermediate',
    coding: 'intermediate-coding',
    instructor: 'industry',
    projects: true,
    cert: ['verified'],
    rating: 4.9,
    ratingCount: '12K',
    price: 'Paid',
    duration: '6 weeks',
    emoji: '🟢',
    bg: 'linear-gradient(135deg,#10a37f,#059669)',
    tags: ['GPT-4', 'API', 'Apps'],
    tagType: ['tag-yellow', '', 'tag-green']
  },
  {
    id: 11,
    title: 'Reinforcement Learning Fundamentals',
    provider: 'coursera',
    domains: ['rl'],
    level: 'advanced',
    coding: 'advanced-coding',
    instructor: 'academia',
    projects: true,
    cert: ['verified'],
    rating: 4.6,
    ratingCount: '9K',
    price: 'Paid',
    duration: '4 months',
    emoji: '🎮',
    bg: 'linear-gradient(135deg,#7c3aed,#db2777)',
    tags: ['RL', 'OpenAI Gym', 'Advanced'],
    tagType: ['', '', 'tag-red']
  },
  {
    id: 12,
    title: 'AI in Education: Teaching & Learning',
    provider: 'edx',
    domains: ['aibiz'],
    level: 'beginner',
    coding: 'none',
    instructor: 'academia',
    projects: false,
    cert: ['university-credit'],
    rating: 4.7,
    ratingCount: '22K',
    price: 'Free Audit',
    duration: '5 weeks',
    emoji: '🏫',
    bg: 'linear-gradient(135deg,#0369a1,#0284c7)',
    tags: ['Educators', 'No Coding', 'University'],
    tagType: ['tag-yellow', 'tag-green', 'tag-yellow']
  },
];

const COMMUNITY_PATHS = [
  {
    emoji: '🚀',
    title: 'Become an AI Product Manager',
    author: 'sarahkim_pm',
    courses: ['AI for Everyone', 'Machine Learning Specialization', 'Building AI-Powered Apps'],
    courseCount: 6,
    duration: '4 months',
    followers: '2.4K',
  },
  {
    emoji: '🧠',
    title: 'NLP Engineer Roadmap (2026)',
    author: 'nlp_practitioner',
    courses: ['Deep Learning Specialization', 'NLP with Transformers', 'Generative AI'],
    courseCount: 8,
    duration: '6 months',
    followers: '5.1K',
  },
  {
    emoji: '💼',
    title: 'AI Upskilling for Business Leaders',
    author: 'enterprise_learner',
    courses: ['AI for Everyone', 'AI in Education', 'MLOps Specialization'],
    courseCount: 4,
    duration: '2 months',
    followers: '1.8K',
  },
  {
    emoji: '🔬',
    title: 'Deep Learning Research Track',
    author: 'dl_researcher',
    courses: ['Deep Learning Specialization', 'Practical DL for Coders', 'RL Fundamentals'],
    courseCount: 9,
    duration: '8 months',
    followers: '3.2K',
  },
  {
    emoji: '👁️',
    title: 'Computer Vision from Zero to Hero',
    author: 'cv_wizard',
    courses: ['ML Specialization', 'Practical DL for Coders', 'CV Nanodegree'],
    courseCount: 7,
    duration: '5 months',
    followers: '4.0K',
  },
  {
    emoji: '🤖',
    title: 'Build Your First LLM Application',
    author: 'build_with_ai',
    courses: ['Generative AI with LLMs', 'NLP with Transformers', 'GPT-4 Apps'],
    courseCount: 5,
    duration: '3 months',
    followers: '6.7K',
  },
];

// Tutorial answer data
const TUTORIAL_ANSWERS = {
  backprop: {
    title: 'Implementing Backpropagation from Scratch in Python',
    explanation: `<p>Backpropagation is the key algorithm for training neural networks. It computes gradients of the loss function with respect to each weight using the <strong>chain rule of calculus</strong>.</p>
<p>The algorithm has two key phases:</p>
<p><strong>1. Forward Pass</strong> — Feed inputs through the network and compute predictions<br/>
<strong>2. Backward Pass</strong> — Propagate error backwards through each layer, computing gradients</p>
<p>Here's a clean from-scratch implementation:</p>`,
    code: `<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="kw">class</span> <span class="fn">SimpleNeuralNet</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, lr=<span class="num">0.01</span>):
        <span class="cm"># Xavier initialization</span>
        self.W1 = np.random.randn(<span class="num">784</span>, <span class="num">128</span>) * np.sqrt(<span class="num">2</span>/<span class="num">784</span>)
        self.W2 = np.random.randn(<span class="num">128</span>, <span class="num">10</span>)  * np.sqrt(<span class="num">2</span>/<span class="num">128</span>)
        self.b1 = np.zeros((<span class="num">1</span>, <span class="num">128</span>))
        self.b2 = np.zeros((<span class="num">1</span>, <span class="num">10</span>))
        self.lr = lr

    <span class="kw">def</span> <span class="fn">relu</span>(self, z):
        <span class="kw">return</span> np.maximum(<span class="num">0</span>, z)

    <span class="kw">def</span> <span class="fn">softmax</span>(self, z):
        e = np.exp(z - np.max(z))
        <span class="kw">return</span> e / e.sum(axis=<span class="num">1</span>, keepdims=<span class="kw">True</span>)

    <span class="kw">def</span> <span class="fn">forward</span>(self, X):
        self.z1 = X @ self.W1 + self.b1
        self.a1 = self.relu(self.z1)
        self.z2 = self.a1 @ self.W2 + self.b2
        self.a2 = self.softmax(self.z2)
        <span class="kw">return</span> self.a2

    <span class="kw">def</span> <span class="fn">backward</span>(self, X, y):
        m = X.shape[<span class="num">0</span>]
        <span class="cm"># ← Output layer gradient</span>
        dz2 = self.a2 - y
        dW2 = self.a1.T @ dz2 / m
        db2 = dz2.mean(axis=<span class="num">0</span>, keepdims=<span class="kw">True</span>)
        <span class="cm"># ← Hidden layer gradient (chain rule)</span>
        da1 = dz2 @ self.W2.T
        dz1 = da1 * (self.z1 > <span class="num">0</span>)  <span class="cm"># ReLU derivative</span>
        dW1 = X.T @ dz1 / m
        db1 = dz1.mean(axis=<span class="num">0</span>, keepdims=<span class="kw">True</span>)
        <span class="cm"># Update weights (gradient descent)</span>
        self.W1 -= self.lr * dW1
        self.W2 -= self.lr * dW2
        self.b1 -= self.lr * db1
        self.b2 -= self.lr * db2`,
    courses: [
      { provider: 'DeepLearning.AI', title: 'Deep Learning Specialization', meta: '5 courses • 3 months', icon: '🧠', bg: 'linear-gradient(135deg,#7c3aed,#4f46e5)' },
      { provider: 'Fast.ai', title: 'Practical Deep Learning for Coders', meta: 'Free • 14 weeks', icon: '⚡', bg: 'linear-gradient(135deg,#f97316,#ef4444)' },
    ]
  },
  attention: {
    title: 'Explaining Attention Mechanisms in Transformers (ELI5)',
    explanation: `<p>Imagine you're reading the sentence: <strong>"The dog chased the cat because it was fast."</strong></p>
<p>When you read "it," your brain automatically pays more <strong>attention</strong> to "cat" than "dog" because context tells you the cat was the fast one. Attention mechanisms do exactly this for AI!</p>
<p>The Transformer computes three things for every word:</p>
<p>🔑 <strong>Query (Q)</strong> — "What am I looking for?"<br/>
🗝️ <strong>Key (K)</strong>   — "What do I offer?"<br/>
💎 <strong>Value (V)</strong>  — "What's my actual content?"</p>
<p>The attention score is calculated as:</p>`,
    code: `<span class="kw">import</span> torch
<span class="kw">import</span> torch.nn.functional <span class="kw">as</span> F

<span class="kw">def</span> <span class="fn">scaled_dot_product_attention</span>(Q, K, V):
    <span class="str">"""
    Q: (batch, heads, seq, d_k) — "What I want"
    K: (batch, heads, seq, d_k) — "What others offer"
    V: (batch, heads, seq, d_v) — "Actual content"
    """</span>
    d_k = Q.size(-<span class="num">1</span>)
    
    <span class="cm"># Score: how relevant is each position to me?</span>
    scores = Q @ K.transpose(-<span class="num">2</span>, -<span class="num">1</span>) / d_k**<span class="num">0.5</span>
    
    <span class="cm"># Softmax converts scores to probabilities [0, 1]</span>
    attn_weights = F.softmax(scores, dim=-<span class="num">1</span>)
    
    <span class="cm"># Weighted sum of values</span>
    output = attn_weights @ V
    <span class="kw">return</span> output, attn_weights`,
    courses: [
      { provider: 'DeepLearning.AI', title: 'Generative AI with Large Language Models', meta: '3 weeks • Industry', icon: '🤖', bg: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
      { provider: 'Hugging Face', title: 'NLP with Transformers Course', meta: 'Free • 8 weeks', icon: '🤗', bg: 'linear-gradient(135deg,#ffd21e,#f97316)' },
    ]
  },
  overfit: {
    title: 'Fixing Overfitting in PyTorch: A Complete Guide',
    explanation: `<p>Overfitting happens when your model <strong>memorizes training data</strong> instead of learning generalizable patterns — like a student who memorizes answers without understanding concepts.</p>
<p>You'll notice it when: training accuracy is high (~99%) but validation accuracy is much lower (~70%). The gap is the overfitting signal.</p>
<p><strong>The 5 most effective regularization strategies:</strong></p>
<p>1. <strong>Dropout</strong> — Randomly deactivate neurons during training<br/>
2. <strong>Weight Decay (L2)</strong> — Penalize large weights in the optimizer<br/>
3. <strong>Batch Normalization</strong> — Normalize layer inputs for stability<br/>
4. <strong>Data Augmentation</strong> — Artificially increase training diversity<br/>
5. <strong>Early Stopping</strong> — Stop when validation loss stops improving</p>`,
    code: `<span class="kw">import</span> torch.nn <span class="kw">as</span> nn

<span class="kw">class</span> <span class="fn">RegularizedModel</span>(nn.Module):
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        <span class="cm">super().__init__()</span>
        self.net = nn.Sequential(
            nn.Linear(<span class="num">512</span>, <span class="num">256</span>),
            nn.BatchNorm1d(<span class="num">256</span>),      <span class="cm"># Stabilize</span>
            nn.ReLU(),
            nn.Dropout(p=<span class="num">0.4</span>),        <span class="cm"># Dropout 40%</span>
            nn.Linear(<span class="num">256</span>, <span class="num">128</span>),
            nn.BatchNorm1d(<span class="num">128</span>),
            nn.ReLU(),
            nn.Dropout(p=<span class="num">0.3</span>),
            nn.Linear(<span class="num">128</span>, <span class="num">10</span>)
        )

<span class="cm"># L2 via weight_decay in optimizer</span>
optimizer = torch.optim.Adam(
    model.parameters(),
    lr=<span class="num">1e-3</span>,
    weight_decay=<span class="num">1e-4</span>          <span class="cm"># L2 regularization</span>
)`,
    courses: [
      { provider: 'DeepLearning.AI', title: 'Deep Learning Specialization', meta: '5 courses • Verified', icon: '🧠', bg: 'linear-gradient(135deg,#7c3aed,#4f46e5)' },
      { provider: 'Fast.ai', title: 'Practical Deep Learning for Coders', meta: 'Free • PyTorch', icon: '⚡', bg: 'linear-gradient(135deg,#f97316,#ef4444)' },
    ]
  },
  chatbot: {
    title: 'Building a Chatbot with Python and LangChain',
    explanation: `<p>LangChain is the most popular framework for building LLM-powered applications. It gives you building blocks for <strong>chains</strong>, <strong>memory</strong>, and <strong>tool use</strong>.</p>
<p>For a chatbot, you need three things:</p>
<p>📝 <strong>Prompt Template</strong> — How you format questions for the LLM<br/>
🧲 <strong>Memory</strong> — How the bot remembers conversation history<br/>
🔗 <strong>Chain</strong> — Connects prompt → LLM → response</p>`,
    code: `<span class="kw">from</span> langchain.chat_models <span class="kw">import</span> ChatOpenAI
<span class="kw">from</span> langchain.memory <span class="kw">import</span> ConversationBufferMemory
<span class="kw">from</span> langchain.chains <span class="kw">import</span> ConversationChain
<span class="kw">from</span> langchain.prompts <span class="kw">import</span> PromptTemplate

<span class="cm"># 1. Initialize LLM</span>
llm = ChatOpenAI(model=<span class="str">"gpt-4"</span>, temperature=<span class="num">0.7</span>)

<span class="cm"># 2. Set up memory so it remembers context</span>
memory = ConversationBufferMemory(
    memory_key=<span class="str">"history"</span>,
    return_messages=<span class="kw">True</span>
)

<span class="cm"># 3. Create the chain</span>
chatbot = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=<span class="kw">False</span>
)

<span class="cm"># 4. Chat!</span>
<span class="kw">while</span> <span class="kw">True</span>:
    user_input = input(<span class="str">"You: "</span>)
    response = chatbot.predict(input=user_input)
    print(<span class="str">f"Bot: {response}"</span>)`,
    courses: [
      { provider: 'DeepLearning.AI', title: 'Generative AI with LLMs', meta: '3 weeks • Hands-on', icon: '🤖', bg: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
      { provider: 'Coursera', title: 'Machine Learning Specialization', meta: '2 months • Beginner', icon: '🎓', bg: 'linear-gradient(135deg,#0056d2,#0284c7)' },
    ]
  },
  transformer: {
    title: 'How Transformers Work: A Step-by-Step Breakdown',
    explanation: `<p>Transformers revolutionized AI by replacing recurrence (RNNs) with <strong>self-attention</strong>. They process entire sequences in parallel, making them both fast and powerful.</p>
<p>The Transformer architecture has two main parts:</p>
<p>🔵 <strong>Encoder</strong> — Reads and understands the input<br/>
🟢 <strong>Decoder</strong> — Generates the output token by token</p>
<p>Each layer does: <strong>LayerNorm → Multi-Head Attention → LayerNorm → Feed Forward</strong></p>`,
    code: `<span class="kw">import</span> torch
<span class="kw">import</span> torch.nn <span class="kw">as</span> nn

<span class="kw">class</span> <span class="fn">TransformerBlock</span>(nn.Module):
    <span class="kw">def</span> <span class="fn">__init__</span>(self, d_model=<span class="num">512</span>, n_heads=<span class="num">8</span>):
        <span class="cm">super().__init__()</span>
        <span class="cm"># Multi-Head Self-Attention</span>
        self.attn = nn.MultiheadAttention(d_model, n_heads)
        <span class="cm"># Feed Forward Network</span>
        self.ff = nn.Sequential(
            nn.Linear(d_model, d_model * <span class="num">4</span>),
            nn.GELU(),
            nn.Linear(d_model * <span class="num">4</span>, d_model)
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)

    <span class="kw">def</span> <span class="fn">forward</span>(self, x):
        <span class="cm"># Residual + Attention</span>
        attn_out, _ = self.attn(x, x, x)
        x = self.norm1(x + attn_out)
        <span class="cm"># Residual + FF</span>
        x = self.norm2(x + self.ff(x))
        <span class="kw">return</span> x`,
    courses: [
      { provider: 'Hugging Face', title: 'NLP Course', meta: 'Free • Transformers', icon: '🤗', bg: 'linear-gradient(135deg,#ffd21e,#f97316)' },
      { provider: 'DeepLearning.AI', title: 'Generative AI with LLMs', meta: '3 weeks • Industry', icon: '🤖', bg: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
    ]
  },
  rag: {
    title: 'What is RAG? Retrieval-Augmented Generation Explained',
    explanation: `<p>RAG (Retrieval-Augmented Generation) solves a key LLM problem: models have a <strong>knowledge cutoff</strong> and can hallucinate facts.</p>
<p>RAG connects your LLM to a <strong>live knowledge base</strong>. Before generating, it retrieves relevant documents and injects them into the prompt as context.</p>
<p><strong>The RAG pipeline:</strong></p>
<p>1️⃣ User asks a question<br/>
2️⃣ Query is embedded into a vector<br/>
3️⃣ Similar document chunks are retrieved from a vector DB<br/>
4️⃣ LLM generates answer using retrieved context<br/>
5️⃣ Answer is grounded in real data, not hallucinated</p>`,
    code: `<span class="kw">from</span> langchain.vectorstores <span class="kw">import</span> FAISS
<span class="kw">from</span> langchain.embeddings <span class="kw">import</span> OpenAIEmbeddings
<span class="kw">from</span> langchain.chains <span class="kw">import</span> RetrievalQA
<span class="kw">from</span> langchain.chat_models <span class="kw">import</span> ChatOpenAI

<span class="cm"># 1. Load documents and create vector store</span>
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(docs, embeddings)
retriever = vectorstore.as_retriever(
    search_kwargs={<span class="str">"k"</span>: <span class="num">4</span>}  <span class="cm"># Retrieve 4 chunks</span>
)

<span class="cm"># 2. Create RAG chain</span>
rag_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model=<span class="str">"gpt-4"</span>),
    retriever=retriever,
    return_source_documents=<span class="kw">True</span>
)

<span class="cm"># 3. Ask questions grounded in your docs</span>
result = rag_chain(<span class="str">"What are our Q4 revenue projections?"</span>)
print(result[<span class="str">'result'</span>])`,
    courses: [
      { provider: 'DeepLearning.AI', title: 'Generative AI with LLMs', meta: '3 weeks • Project-based', icon: '🤖', bg: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
      { provider: 'Coursera', title: 'Machine Learning Specialization', meta: 'Beginner friendly', icon: '🎓', bg: 'linear-gradient(135deg,#0056d2,#0284c7)' },
    ]
  }
};
