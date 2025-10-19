-- Create forum categories table
CREATE TABLE public.forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;

-- Create forum threads table
CREATE TABLE public.forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;

-- Create forum replies table
CREATE TABLE public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.forum_replies(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

-- Create Q&A questions table
CREATE TABLE public.qa_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  views_count INTEGER DEFAULT 0,
  votes_count INTEGER DEFAULT 0,
  answers_count INTEGER DEFAULT 0,
  is_solved BOOLEAN DEFAULT FALSE,
  accepted_answer_id UUID,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.qa_questions ENABLE ROW LEVEL SECURITY;

-- Create Q&A answers table
CREATE TABLE public.qa_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.qa_questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  votes_count INTEGER DEFAULT 0,
  is_accepted BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.qa_answers ENABLE ROW LEVEL SECURITY;

-- Create votes table (for Q&A upvoting)
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  votable_type TEXT NOT NULL CHECK (votable_type IN ('question', 'answer')),
  votable_id UUID NOT NULL,
  vote_value INTEGER NOT NULL CHECK (vote_value IN (-1, 1)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, votable_type, votable_id)
);

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Create reports table
CREATE TABLE public.content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('project', 'comment', 'thread', 'reply', 'question', 'answer')),
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'dismissed')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;

-- Insert default forum categories
INSERT INTO public.forum_categories (name, description, slug, icon, order_index) VALUES
('Getting Started', 'New to coding? Start here with beginner questions and introductions!', 'getting-started', '🚀', 1),
('Game Development', 'Share your game projects and discuss game dev tips!', 'game-dev', '🎮', 2),
('Web Development', 'Building websites and web apps? Let''s talk HTML, CSS, and JavaScript!', 'web-dev', '🌐', 3),
('Show & Tell', 'Show off your latest projects and creations!', 'show-tell', '⭐', 4),
('Help & Support', 'Stuck on something? Ask for help here!', 'help-support', '🆘', 5);

-- RLS Policies for forum_categories
CREATE POLICY "Forum categories are viewable by everyone"
  ON public.forum_categories FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage categories"
  ON public.forum_categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for forum_threads
CREATE POLICY "Approved threads are viewable by everyone"
  ON public.forum_threads FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create threads"
  ON public.forum_threads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own threads"
  ON public.forum_threads FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Moderators can manage threads"
  ON public.forum_threads FOR ALL
  USING (
    public.has_role(auth.uid(), 'moderator') OR 
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for forum_replies
CREATE POLICY "Approved replies are viewable by everyone"
  ON public.forum_replies FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create replies"
  ON public.forum_replies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own replies"
  ON public.forum_replies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Moderators can manage replies"
  ON public.forum_replies FOR ALL
  USING (
    public.has_role(auth.uid(), 'moderator') OR 
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for qa_questions
CREATE POLICY "Approved questions are viewable by everyone"
  ON public.qa_questions FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can ask questions"
  ON public.qa_questions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questions"
  ON public.qa_questions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Moderators can manage questions"
  ON public.qa_questions FOR ALL
  USING (
    public.has_role(auth.uid(), 'moderator') OR 
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for qa_answers
CREATE POLICY "Approved answers are viewable by everyone"
  ON public.qa_answers FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can post answers"
  ON public.qa_answers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own answers"
  ON public.qa_answers FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Moderators can manage answers"
  ON public.qa_answers FOR ALL
  USING (
    public.has_role(auth.uid(), 'moderator') OR 
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for votes
CREATE POLICY "Votes are viewable by everyone"
  ON public.votes FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can vote"
  ON public.votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes"
  ON public.votes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON public.votes FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for content_reports
CREATE POLICY "Users can view their own reports"
  ON public.content_reports FOR SELECT
  USING (auth.uid() = reporter_id);

CREATE POLICY "Moderators can view all reports"
  ON public.content_reports FOR SELECT
  USING (
    public.has_role(auth.uid(), 'moderator') OR 
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Authenticated users can create reports"
  ON public.content_reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Moderators can manage reports"
  ON public.content_reports FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'moderator') OR 
    public.has_role(auth.uid(), 'admin')
  );

-- Add triggers for updated_at
CREATE TRIGGER update_forum_threads_updated_at
  BEFORE UPDATE ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_forum_replies_updated_at
  BEFORE UPDATE ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_qa_questions_updated_at
  BEFORE UPDATE ON public.qa_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_qa_answers_updated_at
  BEFORE UPDATE ON public.qa_answers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();