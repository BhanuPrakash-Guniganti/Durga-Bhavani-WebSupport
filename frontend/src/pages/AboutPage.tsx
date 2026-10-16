import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Users, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { sampleSiteSettings } from '../data/sampleData';
import { SampleBadge } from '../components/common/SampleBadge';

export const AboutPage: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <span className="sub-heading">Organization & Heritage</span>
          <h1>About Durga Bhavani Seva Samiti</h1>
          <p>
            The dedicated committee coordinating religious rituals, community welfare, and cultural
            celebrations at Sri Durga Bhavani Temple, Dodlapahad.
          </p>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <SampleBadge label="Sample Organization Overview - Subject to Committee Approval" />
          </div>
        </div>

        {/* Purpose & Overview */}
        <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-10)', marginBottom: 'var(--space-12)' }}>
          <div>
            <h2>Purpose of the Samiti</h2>
            <p>
              <strong>Durga Bhavani Seva Samiti, Dodlapahad</strong> was established through the collective initiative
              of village elders, devotees, and youth. The Samiti functions as an honorary volunteer organization
              charged with the planning, fundraising, spiritual sanctity, and logistical execution of the annual
              Navaratri celebrations.
            </p>
            <p>
              The committee fosters a spirit of inclusivity, ensuring that devotees from all
              walks of life actively participate in festival rituals, cultural programs, and community dining.
            </p>
            <p>
              With the launch of this digital portal, the Samiti takes a progressive step toward transparent governance,
              digital preservation of photographic archives, and timely dissemination of temple notices.
            </p>
          </div>

          <div className="card card-cultural-top" style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ borderBottom: '2px solid var(--color-gold-primary)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              Core Responsibilities
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <ShieldCheck size={20} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Upholding traditional Vedic rituals, daily alankarams, and festive sanctity.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Heart size={20} color="var(--color-saffron-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Conducting mass Maha Annadanam (community feeding) for all visitors.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Users size={20} color="var(--color-gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Mobilizing village youth for cultural volunteering, traffic, and palanquin seva.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Award size={20} color="var(--color-maroon-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Preserving photographic, historical, and archival memories of each celebration.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid-2" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          <div className="card" style={{ padding: 'var(--space-6)', borderLeft: '4px solid var(--color-maroon-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
              <div className="state-icon-wrapper" style={{ width: '44px', height: '44px', margin: 0, color: 'var(--color-maroon-primary)' }}>
                <Target size={22} />
              </div>
              <h3 style={{ margin: 0 }}>Our Mission</h3>
            </div>
            <p style={{ margin: 0 }}>
              {sampleSiteSettings.mission}
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-6)', borderLeft: '4px solid var(--color-saffron-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
              <div className="state-icon-wrapper" style={{ width: '44px', height: '44px', margin: 0, color: 'var(--color-saffron-primary)' }}>
                <Compass size={22} />
              </div>
              <h3 style={{ margin: 0 }}>Our Vision</h3>
            </div>
            <p style={{ margin: 0 }}>
              {sampleSiteSettings.vision}
            </p>
          </div>
        </div>

        {/* Committee Transparency Note */}
        <div className="card" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-cream-alt)', textAlign: 'center' }}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>
            Organizing Committee Members & Volunteers
          </h3>
          <p style={{ maxWidth: '700px', margin: '0 auto var(--space-4) auto', fontSize: 'var(--font-size-sm)' }}>
            In accordance with committee policy, individual administrative records, office-bearer lists, and contact
            details will be reviewed and published upon formal authorization.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
            <Link to="/contact" className="btn btn-primary btn-sm">
              <span>Contact the Committee</span>
              <ArrowRight size={14} />
            </Link>
            <Link to="/history" className="btn btn-secondary btn-sm">
              <span>View Celebration Milestones</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
