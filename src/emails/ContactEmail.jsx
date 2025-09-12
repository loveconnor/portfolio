import React from 'react';
import { Html, Head, Body, Container, Section, Text, Link, Hr } from '@react-email/components';

export default function ContactEmail({ name, email, message }) {
  return (
    <Html>
      <Head />
      <Body style={styles.body}> 
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerTitle}>New Contact Form Submission</Text>
          </Section>

          <Section style={styles.section}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>
          </Section>

          <Section style={styles.section}>
            <Text style={styles.label}>Email</Text>
            <Link href={`mailto:${email}`} style={styles.link}>{email}</Link>
          </Section>

          <Section style={styles.section}>
            <Text style={styles.label}>Message</Text>
            <Text style={styles.message}>{message}</Text>
          </Section>

          <Hr style={styles.hr} />
          <Text style={styles.footer}>This is an automated notification from your contact form.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: '#f6f9fc',
    margin: 0,
    padding: '24px 0',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: '#222',
  },
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#4f46e5',
    padding: '20px 24px',
  },
  headerTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 600,
  },
  section: {
    padding: '16px 24px',
  },
  label: {
    margin: 0,
    fontSize: 13,
    color: '#555',
    fontWeight: 600,
    marginBottom: 6,
  },
  value: {
    margin: 0,
    fontSize: 15,
    color: '#222',
  },
  link: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontSize: 15,
  },
  message: {
    whiteSpace: 'pre-wrap',
    lineHeight: 1.6,
    backgroundColor: '#f5f7ff',
    padding: 12,
    borderRadius: 6,
    borderLeft: '4px solid #4f46e5',
    margin: 0,
    fontSize: 15,
  },
  hr: {
    borderColor: '#eee',
    margin: '8px 24px 0',
  },
  footer: {
    padding: '12px 24px 24px',
    fontSize: 12,
    color: '#666',
  },
};


